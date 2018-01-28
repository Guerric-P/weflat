package fr.weflat.backend.web.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.Report;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.enums.VisitStatusEnum;
import fr.weflat.backend.service.AcheteurService;
import fr.weflat.backend.service.ArchitecteService;
import fr.weflat.backend.service.ReportService;
import fr.weflat.backend.service.UtilisateurService;
import fr.weflat.backend.service.VisiteService;
import fr.weflat.backend.service.ZipCodeService;
import fr.weflat.backend.web.dto.ReportDto;
import fr.weflat.backend.web.dto.VisiteDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/visits")
public class VisiteController {

	@Autowired
	UtilisateurService utilisateurService;

	@Autowired
	ArchitecteService architecteService;

	@Autowired
	AcheteurService acheteurService;

	@Autowired
	VisiteService visiteService;
	
	@Autowired
	ReportService reportService;

	@Autowired
	ZipCodeService zipCodeService;

	@Autowired
	MapperFacade orikaMapperFacade;

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/available", method = RequestMethod.GET)
	public List<VisiteDto> getVisites(Authentication authentication) {

		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Set<Visite> visites = visiteService.findAvailableVisits((Long) details.get("id"));

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/planned", method = RequestMethod.GET)
	public List<VisiteDto> getPlannedVisites(Authentication authentication) {

		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Set<Visite> visites = visiteService.findPlannedVisits((Long) details.get("id"));

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/report-pending", method = RequestMethod.GET)
	public List<VisiteDto> getReportPendingVisites(Authentication authentication) {

		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Set<Visite> visites = visiteService.findReportPendingVisits((Long) details.get("id"));

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/report-written", method = RequestMethod.GET)
	public List<VisiteDto> getReportWrittenVisites(Authentication authentication) {

		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Set<Visite> visites = visiteService.findReportWrittenVisits((Long) details.get("id"));

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.POST)
	public String postVisite(@RequestBody VisiteDto input, Authentication authentication) {

		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Visite visite = new Visite();

		visite = orikaMapperFacade.map(input, Visite.class);

		ZipCode zipCode = zipCodeService.getByCode(input.getZipCode().getNumber());

		if (zipCode == null) {
			zipCode = new ZipCode();
			zipCode.setNumber(input.getZipCode().getNumber());
			zipCode = zipCodeService.save(zipCode);
		}

		Acheteur acheteur = acheteurService.findById((Long) details.get("id"));

		Set<Architecte> nearbyArchitectes = architecteService.findNearbyArchitectes(input.getZipCode().getNumber());

		visite.setNearbyArchitectes(nearbyArchitectes);
		visite.setAcheteur(acheteur);
		visite.setZipCode(zipCode);
		visite.setCreationDate(new Date());
		visite.setStatus(VisitStatusEnum.BEING_ASSIGNED.ordinal());

		visiteService.save(visite);

		return "";
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
		return architecteService.getById((Long) details.get("id")).getPotentialVisites().size();
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/{id}/report", method = RequestMethod.GET)
	public ReportDto getReport(@PathVariable("id") long id, Authentication authentication) {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		
		Report report =  reportService.getByVisiteId((Long) details.get("id"));
		ReportDto reportDto = null;
		
		if(report == null) {
			Visite visite = visiteService.getById(id);
			
			reportDto = new ReportDto();
			reportDto.setVisite(orikaMapperFacade.map(visite, VisiteDto.class));
		}
		else {
			if(report.getVisite().getArchitecte() != null && report.getVisite().getArchitecte().getId() == (Long) details.get("id")) {
				
			} else {
				throw new AccessDeniedException("Non autorisé.");
			}
		}
		
		return reportDto;
	}
}
