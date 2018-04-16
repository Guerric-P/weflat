package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Set;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.service.AcheteurService;
import fr.weflat.backend.service.VisiteService;
import fr.weflat.backend.web.dto.AcheteurDto;
import fr.weflat.backend.web.dto.UtilisateurSignupDto;
import fr.weflat.backend.web.dto.VisiteDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/acheteurs")
public class AcheteurController {
	@Autowired
	AcheteurService acheteurService;
	
	@Autowired
	VisiteService visiteService;

	@Autowired
	MapperFacade orikaMapperFacade;

	@RequestMapping(path="", method=RequestMethod.POST)
	public void postAcheteur(@RequestBody UtilisateurSignupDto input) {

		acheteurService.save(orikaMapperFacade.map(input, Acheteur.class));

	}

	@RequestMapping(path="/{id}", method= RequestMethod.GET)
	public AcheteurDto getAcheteur(@PathVariable("id") long id) {
		return orikaMapperFacade.map(acheteurService.findById(id), AcheteurDto.class);
	}

	@RequestMapping(path="/{id}", method=RequestMethod.PATCH)
	public void patchArchitecte(@PathVariable("id") long id, @RequestBody AcheteurDto input) {
		Acheteur acheteur = acheteurService.findById(id);
		orikaMapperFacade.map(input, acheteur);
		acheteurService.save(acheteur);
	}
	
	@RequestMapping(path="/{id}/visits/waiting-for-payment", method= RequestMethod.GET)
	public List<VisiteDto> getWaitingForPaymentVisits(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findWaitingForPaymentVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/being-assigned", method= RequestMethod.GET)
	public List<VisiteDto> getBeingAssignedVisits(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findBeingAssignedVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/in-progress", method= RequestMethod.GET)
	public List<VisiteDto> getInProgressVisits(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findInProgressVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/report-being-written", method= RequestMethod.GET)
	public List<VisiteDto> getReportBeingWrittenVisits(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findReportBeingWrittenVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/report-written", method= RequestMethod.GET)
	public List<VisiteDto> getReportWrittenVisits(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findReportWrittenVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/planned", method= RequestMethod.GET)
	public List<VisiteDto> getPlannedVisits(@PathVariable("id") long id) {
		Set<Visite> visites = visiteService.findPlannedVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
}
