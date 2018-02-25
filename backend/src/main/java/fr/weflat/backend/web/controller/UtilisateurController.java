package fr.weflat.backend.web.controller;

import java.util.Map;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Utilisateur;
import fr.weflat.backend.service.UtilisateurService;
import fr.weflat.backend.web.dto.PasswordDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/users")
public class UtilisateurController {

	@Autowired
	UtilisateurService utilisateurService;

	@Autowired
	MapperFacade orikaMapperFacade;

	/*@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public @ResponseBody UtilisateurDto getUser(@PathVariable("id") long id) {

		Utilisateur utilisateur = utilisateurService.getById(id);

		if (utilisateur instanceof Architecte) {
			return orikaMapperFacade.map(utilisateur, ArchitecteDto.class);
		}

		if (utilisateur instanceof Acheteur) {
			return orikaMapperFacade.map(utilisateur, AcheteurDto.class);
		}

		return orikaMapperFacade.map(utilisateurService.getById(id), UtilisateurDto.class);
	}*/

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/password", method = RequestMethod.PUT)
	public void changePassword(@RequestBody PasswordDto input, Authentication authentication) {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

		Utilisateur user = utilisateurService.getById((Long) details.get("id"));
		user.setPassword(input.getPassword());
		utilisateurService.save(user);
	}

}
