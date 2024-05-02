package fr.weflat.backend.web.controller;

import jakarta.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import fr.weflat.backend.service.UserService;
import fr.weflat.backend.web.dto.PasswordDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	MapperFacade orikaMapperFacade;

	/*@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public @ResponseBody UtilisateurDto getUser(@PathVariable("id") long id) {

		Utilisateur utilisateur = utilisateurService.findById(id);

		if (utilisateur instanceof Architecte) {
			return orikaMapperFacade.map(utilisateur, ArchitecteDto.class);
		}

		if (utilisateur instanceof Acheteur) {
			return orikaMapperFacade.map(utilisateur, AcheteurDto.class);
		}

		return orikaMapperFacade.map(utilisateurService.findById(id), UtilisateurDto.class);
	}*/
	
	@PostMapping("/forgotten-password")
	public void passwordForgotten(@RequestParam String email) throws Exception {
		if(email == null || email.length() == 0) {
			throw new Exception("Email parameter is required");
		}
		else {
			userService.forgottenPassword(email);
		}
	}
	
	@PostMapping("/reset-password")
	public void resetPassword(@RequestParam String hash, @RequestParam String password) throws Exception {
		if(hash == null || hash.length() == 0) {
			throw new Exception("Hash parameter is required");
		}
		else if (password == null || password.length() == 0) {
			throw new Exception("New password parameter is required");
		}
		else {
			userService.resetPassword(hash, password);
		}
	}

	@PutMapping("/{id}/password")
	public void changePassword(@PathVariable long id, @RequestBody PasswordDto input) {
		userService.changePassword(id, input.getPassword());
	}

}
