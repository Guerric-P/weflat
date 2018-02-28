package fr.weflat.backend.web.controller;

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

import fr.weflat.backend.domaine.Renovation;
import fr.weflat.backend.domaine.Report;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.enums.VisitStatusEnum;
import fr.weflat.backend.service.ReportService;
import fr.weflat.backend.service.UtilisateurService;
import fr.weflat.backend.service.VisiteService;
import fr.weflat.backend.web.dto.ReportDto;
import fr.weflat.backend.web.dto.VisitCreationResponseDto;
import fr.weflat.backend.web.dto.VisiteDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/visits")
public class VisiteController {

	@Autowired
	UtilisateurService utilisateurService;

	@Autowired
	VisiteService visiteService;

	@Autowired
	ReportService reportService;

	@Autowired
	MapperFacade orikaMapperFacade;

	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.POST)
	public VisitCreationResponseDto postVisit(@RequestBody VisiteDto input, Authentication authentication) throws Exception {

		Long acheteurId = null;
		
		if(authentication != null) {
			acheteurId = (Long)((Map<String, Object>) authentication.getDetails()).get("id");
		}

		Visite visit = new Visite();

		visit = orikaMapperFacade.map(input, Visite.class);

		visiteService.createVisit(visit, acheteurId);

		return new VisitCreationResponseDto(visiteService.isVisitComplete(visit), visit.getZipCode().isActive(), visit.getId());

	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}", method = RequestMethod.PATCH)
	public VisitCreationResponseDto completeVisit(@PathVariable("id") long id, @RequestBody VisiteDto input, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		
		Visite visit = visiteService.getById(id);

		if(visit.getStatus() != VisitStatusEnum.UNASSIGNED.ordinal() && visit.getStatus() != VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal()) {
			throw new Exception("Visit non eligible for modification.");
		} else {
			orikaMapperFacade.map(input, visit);
			visiteService.completeVisitCreation(visit, (long)details.get("id"));
			return new VisitCreationResponseDto(visiteService.isVisitComplete(visit), visit.getZipCode().isActive(), visit.getId());
		}
	}

	@RequestMapping(path = "/{id}/pay", method = RequestMethod.POST)
	public void payVisit(@PathVariable("id") long id, @RequestParam() String token) throws Exception {

		Visite visit = visiteService.getById(id);
		
		if (visit.getStatus() != VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal()) {
			throw new Exception("Visit non eligible for payment.");
		}
		else {
			visiteService.pay(visit, token);
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/accept", method = RequestMethod.POST)
	public void acceptVisite(@RequestParam("id") Long id, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		visiteService.accept(id, (Long) details.get("id"));
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/refuse", method = RequestMethod.POST)
	public void refuseVisit(@RequestParam("id") Long id, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		visiteService.refuse(id, (Long) details.get("id"));
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/count", method = RequestMethod.GET)
	public int getCount(Authentication authentication) {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		return visiteService.findAvailableVisitsByArchitectId((Long) details.get("id")).size();
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/report", method = RequestMethod.GET)
	public ReportDto getReport(@PathVariable("id") long id, Authentication authentication) {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Report report =  reportService.getByVisiteId(id);
		ReportDto reportDto = null;

		if(report == null) {
			Visite visite = visiteService.getById(id);

			reportDto = new ReportDto();
			reportDto.setVisite(orikaMapperFacade.map(visite, VisiteDto.class));
		}
		else {
			if(report.getVisite().getArchitecte() != null && report.getVisite().getArchitecte().getId() == (Long) details.get("id")) {
				reportDto = orikaMapperFacade.map(report, ReportDto.class);
			} else {
				throw new AccessDeniedException("Non autorisé.");
			}
		}

		return reportDto;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/report", method = RequestMethod.POST)
	public void postReport(@PathVariable("id") long id, @RequestBody ReportDto input, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Visite visit = visiteService.getById(id);

		if(visit.getArchitecte().getId().equals((Long) details.get("id"))) {
			visit.setReport(orikaMapperFacade.map(input, Report.class));
			visit.setStatus(VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal());

			//deal with OneToOne mappedby relation
			for(Renovation renovation: visit.getReport().getRenovations()) {
				renovation.setReport(visit.getReport());
			}

			visiteService.save(visit);
		} else if (visit.getReport() != null) {
			throw new Exception("Report already exists for visit" + visit.getId());
		} else {
			throw new AccessDeniedException("Only the architect assigned to this visit can edit the report");
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/report", method = RequestMethod.PATCH)
	public void patchReport(@PathVariable("id") long id, @RequestBody ReportDto input, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Report report = reportService.getByVisiteId(id);

		if(report.getVisite().getArchitecte().getId().equals((Long) details.get("id"))) {
			orikaMapperFacade.map(input, report);
			report.getVisite().setStatus(VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal());

			//deal with OneToOne mappedby relation
			for(Renovation renovation: report.getRenovations()) {
				renovation.setReport(report);
			}

			reportService.save(report);
		}
		else {
			throw new AccessDeniedException("Only the architect assigned to this visit can edit the report");
		}

	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/report/submit", method = RequestMethod.POST)
	public void submitReport(@PathVariable("id") long id, Authentication authentication) throws Exception {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Visite visit = visiteService.getById(id);

		if(visit.getArchitecte().getId().equals((Long) details.get("id"))) {
			if(visit.getStatus() == VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal()) {
				visit.setStatus(VisitStatusEnum.REPORT_AVAILABLE.ordinal());
				visiteService.save(visit);
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
}
