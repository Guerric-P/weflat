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

@RestController
@Produces("application/json")
@RequestMapping("/user")
public class UtilisateurController {
	
	@Autowired
	UtilisateurService utilisateurService;
	
	@Autowired
	ArchitecteService architecteService;
	
	@Autowired
	AcheteurService acheteurService;
	
	@RequestMapping(path="/{id}", method=RequestMethod.GET)
    public @ResponseBody UtilisateurDto getUser(@PathVariable("id") long id) {
		
		Utilisateur utilisateur = utilisateurService.getById(id);
		
		if(utilisateur instanceof Architecte) {
			return new ArchitecteDto(utilisateur);
		}
		
		if(utilisateur instanceof Acheteur) {
			return new AcheteurDto(utilisateur);
		}
		
        return new UtilisateurDto(utilisateurService.getById(id));
    }
	
	@RequestMapping(path="/architecte/{id}", method=RequestMethod.GET)
    public @ResponseBody ArchitecteDto getArchitecte(@PathVariable("id") long id) {
        return new ArchitecteDto(architecteService.getById(id));
	}
	
	@RequestMapping(path="/architecte", method=RequestMethod.POST)
    public String postArchitecte(@RequestBody Architecte input) {
		
		architecteService.save(input);
		
		return "";
    }
	
	@RequestMapping(path="/acheteur", method=RequestMethod.POST)
    public String postAcheteur(@RequestBody Acheteur input) {
		
		acheteurService.save(input);
		
		return "";
    }
}
