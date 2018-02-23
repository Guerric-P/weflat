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
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.service.AcheteurService;
import fr.weflat.backend.web.dto.AcheteurDto;
import fr.weflat.backend.web.dto.UtilisateurSignupDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/acheteur")
public class AcheteurController {
	@Autowired
	AcheteurService acheteurService;

	@Autowired
	MapperFacade orikaMapperFacade;

	@RequestMapping(path="", method=RequestMethod.POST)
	public void postAcheteur(@RequestBody UtilisateurSignupDto input) {

		acheteurService.save(orikaMapperFacade.map(input, Acheteur.class));

	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path="/{id}", method= RequestMethod.GET)
	public AcheteurDto getAcheteur(@PathVariable("id") long id, Authentication authentication) {
		Map<String, Object> details = (Map<String, Object>)authentication.getDetails();

		if(id != (Long)details.get("id")) {
			throw new AccessDeniedException("Non autorisé.");
		}
		else {
			return orikaMapperFacade.map(acheteurService.findById(id), AcheteurDto.class);
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path="/{id}", method=RequestMethod.PATCH)
	public void patchArchitecte(@PathVariable("id") long id, @RequestBody AcheteurDto input, Authentication authentication) {
		Map<String, Object> details = (Map<String, Object>)authentication.getDetails();

		if(id != (Long)details.get("id")) {
			throw new AccessDeniedException("Non autorisé.");
		}
		else {
			Acheteur acheteur = acheteurService.findById((Long)details.get("id"));
			orikaMapperFacade.map(input, acheteur);
			acheteurService.save(acheteur);
		}
	}
}
