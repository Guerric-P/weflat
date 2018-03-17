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

import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.enums.ArchitectStatusEnum;
import fr.weflat.backend.service.ArchitecteService;
import fr.weflat.backend.service.VisiteService;
import fr.weflat.backend.service.ZipCodeService;
import fr.weflat.backend.web.dto.ArchitecteDto;
import fr.weflat.backend.web.dto.UtilisateurSignupDto;
import fr.weflat.backend.web.dto.VisiteDto;
import fr.weflat.backend.web.dto.ZipCodeDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/architecte")
public class ArchitecteController {
	@Autowired
	ArchitecteService architecteService;

	@Autowired
	MapperFacade orikaMapperFacade;

	@Autowired
	VisiteService visiteService;

	@Autowired
	ZipCodeService zipCodeService;

	@RequestMapping(path="/{id}/zipcodes", method=RequestMethod.POST)
	public void setZipCodes(@PathVariable("id") long id, @RequestBody Set<ZipCodeDto> input) {
		architecteService.saveZipCodesForArchitecte(orikaMapperFacade.mapAsList(input, ZipCode.class), id);
	}

	@RequestMapping(path="/{id}/zipcodes", method=RequestMethod.GET)
	public List<ZipCodeDto> getZipCodes(@PathVariable("id") long id) {	
		return orikaMapperFacade.mapAsList(architecteService.getById(id).getZipCodes(), ZipCodeDto.class);
	}

	@RequestMapping(path="/{id}", method=RequestMethod.GET)
	public @ResponseBody ArchitecteDto getArchitecte(@PathVariable("id") long id) {
		return orikaMapperFacade.map(architecteService.getById(id), ArchitecteDto.class);
	}

	@RequestMapping(path="", method=RequestMethod.POST)
	public void postArchitecte(@RequestBody UtilisateurSignupDto input) {

		Architecte architecte = orikaMapperFacade.map(input, Architecte.class);
		architecte.setStatus(ArchitectStatusEnum.CREATED.ordinal());
		architecteService.save(architecte);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path="", method=RequestMethod.GET)
	public ArchitecteDto getArchitecte(Authentication authentication) {
		Map<String, Object> details = (Map<String, Object>)authentication.getDetails();

		return orikaMapperFacade.map(architecteService.getById((Long)details.get("id")), ArchitecteDto.class);

	}


	@RequestMapping(path="/{id}", method=RequestMethod.PATCH)
	public void patchArchitecte(@PathVariable("id") long id, @RequestBody ArchitecteDto input) {

		Architecte architecte = architecteService.getById(id);
		orikaMapperFacade.map(input, architecte);
		architecteService.save(architecte);

	}

	@RequestMapping(path = "/{id}/visits/available", method = RequestMethod.GET)
	public List<VisiteDto> getVisites(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findAvailableVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}

	@RequestMapping(path = "/{id}/visits/planned", method = RequestMethod.GET)
	public List<VisiteDto> getPlannedVisites(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findPlannedVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}

	@RequestMapping(path = "/{id}/visits/report-pending", method = RequestMethod.GET)
	public List<VisiteDto> getReportPendingVisites(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findReportPendingVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}

	@RequestMapping(path = "/{id}/visits/report-written", method = RequestMethod.GET)
	public List<VisiteDto> getReportWrittenVisites(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findReportWrittenVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
}
