package fr.weflat.backend.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.Utilisateur;
import fr.weflat.backend.service.UtilisateurService;

@Component
public class WeflatAuthenticationProvider implements AuthenticationProvider {
	@Autowired
	private UtilisateurService utilisateurService;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String login = (String) authentication.getPrincipal();
		String password = (String) authentication.getCredentials();
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		
		Utilisateur utilisateur = utilisateurService.getByEmailAndPassword(login, password);
		
		if(utilisateur != null) {
			if(utilisateur instanceof Acheteur) {
				list.add(new SimpleGrantedAuthority("acheteur"));
			}
			
			if(utilisateur instanceof Architecte) {
				list.add(new SimpleGrantedAuthority("architecte"));
			}
			
			UsernamePasswordAuthenticationToken retour = new UsernamePasswordAuthenticationToken(
					login, password, list);
			
			retour.setDetails(utilisateur);
			
			return retour;
		}
		else {
			return null;
		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
