package fr.weflat.backend.web.controller;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.service.AcheteurService;
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
    public String postAcheteur(@RequestBody UtilisateurSignupDto input) {
		
		acheteurService.save(orikaMapperFacade.map(input, Acheteur.class));
		
		return "";
    }
}
