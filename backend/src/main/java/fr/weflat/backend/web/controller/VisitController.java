package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Map;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.Renovation;
import fr.weflat.backend.domaine.Report;
import fr.weflat.backend.domaine.Visit;
import fr.weflat.backend.enums.VisitStatusEnum;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.ReportService;
import fr.weflat.backend.service.UserService;
import fr.weflat.backend.service.VisitService;
import fr.weflat.backend.web.dto.ReportDto;
import fr.weflat.backend.web.dto.VisiteDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/visits")
public class VisitController {

	@Autowired
	UserService userService;

	@Autowired
	VisitService visitService;

	@Autowired
	ReportService reportService;

	@Autowired
	MapperFacade orikaMapperFacade;
	
	@Autowired
	MailService mailService;

	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.POST)
	public VisiteDto postVisit(@RequestBody VisiteDto input, Authentication authentication) throws Exception {

		Long customerId = null;

		if(authentication != null) {
			customerId = (Long)((Map<String, Object>) authentication.getDetails()).get("id");
		}

		Visit visit = new Visit();

		visit = orikaMapperFacade.map(input, Visit.class);

		return orikaMapperFacade.map(visitService.createVisit(visit, customerId), VisiteDto.class);

	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<VisiteDto> getAll() {
		return orikaMapperFacade.mapAsList(visitService.findAll(), VisiteDto.class);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}", method = RequestMethod.PATCH)
	public VisiteDto patchVisit(@PathVariable("id") long id, @RequestBody VisiteDto input, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Visit visit = visitService.findById(id);

		if(visit.getStatus() != VisitStatusEnum.UNASSIGNED.ordinal() 
				&& visit.getStatus() != VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal()
				&& visit.getStatus() != VisitStatusEnum.BEING_ASSIGNED.ordinal()) {
			throw new Exception("Visit non eligible for modification.");
		} else {
			orikaMapperFacade.map(input, visit);
			
			if(visit.getStatus() != VisitStatusEnum.BEING_ASSIGNED.ordinal()) {
				return orikaMapperFacade.map(visitService.completeVisitCreation(visit, (long)details.get("id")), VisiteDto.class);
			}
			else {
				return orikaMapperFacade.map(visitService.modifyVisit(visit), VisiteDto.class);
			}
		}
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") long id) {
		visitService.delete(id);
	}

	@RequestMapping(path = "/{id}/pay", method = RequestMethod.POST)
	public VisiteDto payVisit(@PathVariable("id") long id, @RequestParam() String token) throws Exception {

		Visit visit = visitService.findById(id);

		if (visit.getStatus() != VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal()) {
			throw new Exception("Visit non eligible for payment.");
		}
		else {
			Visit paidVisit = visitService.pay(visit, token);
			
			//Mails
			for(Architect architect : visit.getNearbyArchitects()) {
				mailService.sendVisitAvailableMail(
						architect.getEmail(),
						architect.getFirstName(),
						visit.getCustomer().getFirstName(),
						visit.formattedAddress(),
						visit.getVisiteDate()
						);
			}
			
			mailService.sendVisitCreationMail(visit.getCustomer().getEmail(),
					visit.getCustomer().getFirstName(),
					visit.formattedAddress(),
					visit.getVisiteDate()
					);
			
			return orikaMapperFacade.map(paidVisit, VisiteDto.class);
			
		}
	}
	
	@RequestMapping(path = "/{id}/cancel", method = RequestMethod.POST)
	public VisiteDto cancelVisit(@PathVariable("id") long id) throws Exception {

		Visit visit = visitService.findById(id);

		if (visit.getStatus() == VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal()
				|| visit.getStatus() == VisitStatusEnum.UNASSIGNED.ordinal()
				|| visit.getStatus() == VisitStatusEnum.BEING_ASSIGNED.ordinal()
				|| visit.getStatus() == VisitStatusEnum.IN_PROGRESS.ordinal()) {
			return orikaMapperFacade.map(visitService.cancel(visit), VisiteDto.class);
		}
		else {
			throw new Exception("Visit non eligible for cancellation.");
		}
	}
	
	@RequestMapping(path = "/{id}/architect-was-paid", method = RequestMethod.POST)
	public VisiteDto architectWasPaid(@PathVariable("id") long id) throws Exception {
		
		Visit visit = visitService.findById(id);
		
		if(visit.getStatus() == VisitStatusEnum.REPORT_AVAILABLE.ordinal()) {
			return orikaMapperFacade.map(visitService.changeStatusToArchitectWasPaid(visit), VisiteDto.class);
		}
		else {
			throw new Exception("Visit non eligible for \"architect paid\" status.");
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/accept", method = RequestMethod.POST)
	public void acceptVisite(@PathVariable("id") long id, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		visitService.accept(id, (Long) details.get("id"));
		
		//Mails
		Visit visit = visitService.findById(id);
		mailService.sendVisitAttributionMail(
				visit.getArchitect().getEmail(),
				visit.getArchitect().getFirstName(),
				visit.getCustomer().getFirstName(),
				visit.formattedAddress(),
				visit.getVisiteDate()
				);
		
		mailService.sendVisitAssignedMail(
				visit.getCustomer().getEmail(),
				visit.getArchitect().getFirstName(),
				visit.getCustomer().getFirstName(),
				visit.formattedAddress(),
				visit.getVisiteDate()
				);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/refuse", method = RequestMethod.POST)
	public void refuseVisit(@PathVariable("id") long id, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		visitService.refuse(id, (Long) details.get("id"));
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/count", method = RequestMethod.GET)
	public int getCount(Authentication authentication) {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		return visitService.findAvailableVisitsByArchitectId((Long) details.get("id")).size();
	}

	@RequestMapping(path = "/{id}/report", method = RequestMethod.GET)
	public ReportDto getReport(@PathVariable("id") long id, Authentication authentication) {

		Report report =  reportService.getByVisiteId(id);
		ReportDto reportDto = null;

		if(report == null) {
			Visit visite = visitService.findById(id);

			reportDto = new ReportDto();
			reportDto.setVisite(orikaMapperFacade.map(visite, VisiteDto.class));
		}
		else {
			reportDto = orikaMapperFacade.map(report, ReportDto.class);
		}

		return reportDto;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/report", method = RequestMethod.POST)
	public ReportDto postReport(@PathVariable("id") long id, @RequestBody ReportDto input, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Visit visit = visitService.findById(id);

		if(visit.getArchitect().getId().equals((Long) details.get("id"))) {
			if(visit.getStatus() == VisitStatusEnum.IN_PROGRESS.ordinal()) {
				visit.setReport(orikaMapperFacade.map(input, Report.class));
				visit.setStatus(VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal());

				//deal with OneToOne mappedby relation
				for(Renovation renovation: visit.getReport().getRenovations()) {
					renovation.setReport(visit.getReport());
				}

				visitService.save(visit);
				
				return orikaMapperFacade.map(visit.getReport(), ReportDto.class);
			}
			else {
				throw new Exception("Visit does not accept a report yet");
			}
		} else if (visit.getReport() != null) {
			throw new Exception("Report already exists for visit" + visit.getId());
		} else {
			throw new AccessDeniedException("Only the architect assigned to this visit can edit the report");
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/report", method = RequestMethod.PATCH)
	public ReportDto patchReport(@PathVariable("id") long id, @RequestBody ReportDto input, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Report report = reportService.getByVisiteId(id);

		if(report.getVisite().getArchitect().getId().equals((Long) details.get("id"))) {
			if(report.getVisite().getStatus() == VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal()
					|| report.getVisite().getStatus() == VisitStatusEnum.IN_PROGRESS.ordinal()) {
				orikaMapperFacade.map(input, report);
				report.getVisite().setStatus(VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal());

				//deal with OneToOne mappedby relation
				for(Renovation renovation: report.getRenovations()) {
					renovation.setReport(report);
				}

				reportService.save(report);
				
				return orikaMapperFacade.map(report, ReportDto.class);
			}
			else {
				throw new Exception("Report cannot be edited");
			}
		}
		else {
			throw new AccessDeniedException("Only the architect assigned to this visit can edit the report");
		}

	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/report/submit", method = RequestMethod.POST)
	public void submitReport(@PathVariable("id") long id, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Visit visit = visitService.findById(id);

		if(visit.getArchitect().getId().equals((Long) details.get("id"))) {
			if(visit.getStatus() == VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal()) {
				visit.setStatus(VisitStatusEnum.REPORT_AVAILABLE.ordinal());
				visitService.save(visit);
				
				//Mail
				mailService.sendReportReadyMail(
						visit.getCustomer().getEmail(),
						visit.getArchitect().getFirstName(),
						visit.getCustomer().getFirstName()
						);
			}
			else {
				throw new Exception("Report has not been written for visit " + visit.getId());
			}
		} else if (visit.getReport() != null) {
			throw new Exception("Report doesn't exist for visit " + visit.getId());
		} else {
			throw new AccessDeniedException("Only the architect assigned to this visit can submit the report");
		}
	}
	
	@RequestMapping(path = "/price", method = RequestMethod.GET)
	public Long getVisitPrice() {
		return visitService.getVisitPrice();
	}
	
	@RequestMapping(path = "/partial-refund-amount", method = RequestMethod.GET)
	public Long getPartialRefundAmount() {
		return visitService.getVisitPartialRefundAmount();
	}
}
