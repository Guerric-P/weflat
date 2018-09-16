package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.User;
import fr.weflat.backend.domaine.Visit;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.enums.ArchitectStatusEnum;
import fr.weflat.backend.service.ArchitectService;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.UserService;
import fr.weflat.backend.service.VisitService;
import fr.weflat.backend.service.ZipCodeService;
import fr.weflat.backend.web.dto.ArchitectDto;
import fr.weflat.backend.web.dto.DashboardDto;
import fr.weflat.backend.web.dto.UserSignupDto;
import fr.weflat.backend.web.dto.VisiteDto;
import fr.weflat.backend.web.dto.ZipCodeDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/architects")
public class ArchitectController {
	@Autowired
	ArchitectService architectService;
	
	@Autowired
	UserService userService;

	@Autowired
	MapperFacade orikaMapperFacade;

	@Autowired
	VisitService visitService;

	@Autowired
	ZipCodeService zipCodeService;
	
	@Autowired
	MailService mailService;

	@RequestMapping(path="/{id}/zip-codes", method=RequestMethod.POST)
	public void setZipCodes(@PathVariable("id") long id, @RequestBody Set<ZipCodeDto> input) {
		architectService.saveZipCodesForArchitecte(orikaMapperFacade.mapAsList(input, ZipCode.class), id);
	}

	@RequestMapping(path="/{id}/zip-codes", method=RequestMethod.GET)
	public List<ZipCodeDto> getZipCodes(@PathVariable("id") long id) {	
		return orikaMapperFacade.mapAsList(architectService.findById(id).getZipCodes(), ZipCodeDto.class);
	}

	@RequestMapping(path="/{id}", method=RequestMethod.GET)
	public @ResponseBody ArchitectDto getArchitecte(@PathVariable("id") long id) {
		return orikaMapperFacade.map(architectService.findById(id), ArchitectDto.class);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public @ResponseBody List<ArchitectDto> getAll() {
		return orikaMapperFacade.mapAsList(architectService.findAll(), ArchitectDto.class);
	}

	@RequestMapping(path="", method=RequestMethod.POST)
	public ArchitectDto postArchitecte(@RequestBody UserSignupDto input) throws Exception {
		
		User user = userService.findByEmail(input.getEmail());

		if(user == null) {
			Architect architect = orikaMapperFacade.map(input, Architect.class);
			architect.setStatus(ArchitectStatusEnum.CREATED.ordinal());
			ArchitectDto returnValue = orikaMapperFacade.map(architectService.save(architect), ArchitectDto.class);
			
			//Mail
			try {
				mailService.sendArchitectSignupMail(architect.getEmail(), architect.getFirstName());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return returnValue;
		}
		else {
			throw new Exception("This email already exists.");
		}

		
	}

	@RequestMapping(path="/{id}", method=RequestMethod.PATCH)
	public ArchitectDto patchArchitecte(@PathVariable("id") long id, @RequestBody ArchitectDto input) {

		Architect architect = architectService.findById(id);
		orikaMapperFacade.map(input, architect);
		return orikaMapperFacade.map(architectService.save(architect), ArchitectDto.class);

	}

	@RequestMapping(path = "/{id}/visits/available", method = RequestMethod.GET)
	public List<VisiteDto> getVisites(@PathVariable("id") long id) {
		Set<Visit> visits = visitService.findAvailableVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visits, VisiteDto.class);
	}

	@RequestMapping(path = "/{id}/visits/planned", method = RequestMethod.GET)
	public List<VisiteDto> getPlannedVisites(@PathVariable("id") long id) {
		Set<Visit> visits = visitService.findPlannedVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visits, VisiteDto.class);
	}

	@RequestMapping(path = "/{id}/visits/report-pending", method = RequestMethod.GET)
	public List<VisiteDto> getReportPendingVisites(@PathVariable("id") long id) {
		Set<Visit> visits = visitService.findReportPendingVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visits, VisiteDto.class);
	}

	@RequestMapping(path = "/{id}/visits/report-written", method = RequestMethod.GET)
	public List<VisiteDto> getReportWrittenVisites(@PathVariable("id") long id) {
		Set<Visit> visits = visitService.findReportWrittenVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visits, VisiteDto.class);
	}
	
	@RequestMapping(path = "/{id}/accept", method= RequestMethod.POST)
	public void acceptArchitect(@PathVariable("id") long id) throws Exception {
		architectService.accept(id);
	}
	
	@RequestMapping(path = "/{id}/refuse", method= RequestMethod.POST)
	public void refuseArchitect(@PathVariable("id") long id) throws Exception {
		architectService.refuse(id);
	}
	
	@RequestMapping(path = "/{id}/dashboard", method=RequestMethod.GET)
	public DashboardDto getDashboard(@PathVariable("id") long id) {
		
		DashboardDto dto = new DashboardDto();
		dto.setAmountEarned(visitService.getAmountEarned(id));
		dto.setDoneVisitsCount(visitService.getDoneVisitsCount(id));
		dto.setNewVisits(orikaMapperFacade.mapAsList(visitService.findAvailableVisitsByArchitectId(id), VisiteDto.class));
		
		return dto;
	}
}
