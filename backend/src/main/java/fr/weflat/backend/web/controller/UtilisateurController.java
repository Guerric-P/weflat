package fr.weflat.backend.web.controller;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.Utilisateur;
import fr.weflat.backend.service.AcheteurService;
import fr.weflat.backend.service.ArchitecteService;
import fr.weflat.backend.service.UtilisateurService;
import fr.weflat.backend.web.dto.AcheteurDto;
import fr.weflat.backend.web.dto.ArchitecteDto;
import fr.weflat.backend.web.dto.UtilisateurDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/user")
public class UtilisateurController {
	
	@Autowired
	UtilisateurService utilisateurService;
	
	@Autowired
	MapperFacade orikaMapperFacade;
	
	@RequestMapping(path="/{id}", method=RequestMethod.GET)
    public @ResponseBody UtilisateurDto getUser(@PathVariable("id") long id) {
		
		Utilisateur utilisateur = utilisateurService.getById(id);
		
		if(utilisateur instanceof Architecte) {
			return orikaMapperFacade.map(utilisateur, ArchitecteDto.class);
		}
		
		if(utilisateur instanceof Acheteur) {
			return orikaMapperFacade.map(utilisateur, AcheteurDto.class);
		}
		
        return orikaMapperFacade.map(utilisateurService.getById(id), UtilisateurDto.class);
    }
	
	
	
	
}
