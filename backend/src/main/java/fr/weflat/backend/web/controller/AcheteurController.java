package fr.weflat.backend.web.controller;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
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
}
