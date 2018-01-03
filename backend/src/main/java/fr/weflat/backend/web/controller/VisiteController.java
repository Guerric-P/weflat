package fr.weflat.backend.web.controller;

import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.AcheteurService;
import fr.weflat.backend.service.ArchitecteService;
import fr.weflat.backend.service.UtilisateurService;
import fr.weflat.backend.service.VisiteService;
import fr.weflat.backend.service.ZipCodeService;
import fr.weflat.backend.web.dto.VisiteDto;

@RestController
@Produces("application/json")
@RequestMapping("/visit")
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
	ZipCodeService zipCodeService;
	
	@RequestMapping(method=RequestMethod.GET)
	public Set<VisiteDto> getVisite(Authentication authentication) {
		
		Map<String, Object> details = (Map<String, Object>)authentication.getDetails();
		
		Set<Visite> visites = visiteService.findNearbyVisites((Long)details.get("id"));
		
		Set<VisiteDto> result = new HashSet<VisiteDto>();
		
		for(Visite visite : visites) {
			VisiteDto visiteDto = new VisiteDto();
			visiteDto.From(visite);
			result.add(visiteDto);
		}
		
		return result;
	}
	
	@RequestMapping(method=RequestMethod.POST)
    public String postVisite(@RequestBody VisiteDto input, Authentication authentication) {
		     
		Map<String, Object> details = (Map<String, Object>)authentication.getDetails();
		
		Visite visite = new Visite();
		
		ZipCode zipCode = zipCodeService.getByCode(input.getZipCode());
		
		if(zipCode == null) {
			zipCode = new ZipCode();
			zipCode.setNumber(input.getZipCode());
			zipCode = zipCodeService.save(zipCode);
		}
		
		Acheteur acheteur = acheteurService.findById((Long)details.get("id"));
		
		Set<Architecte> nearbyArchitectes = architecteService.findNearbyArchitectes(input.getZipCode());
		
		visite.setNearbyArchitectes(nearbyArchitectes);
		
		visite.setAcheteur(acheteur);
		visite.setZipCode(zipCode);
		visite.setCity(input.getCity());
		visite.setCreationDate(new Date());
		visite.setRoute(input.getRoute());
		visite.setStreetNumber(input.getStreetNumber());
		visite.setVisiteDate(input.getVisiteDate());
		
		visiteService.save(visite);
		
		return "";
    }
}
