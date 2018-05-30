package fr.weflat.backend.security;

import java.util.ArrayList;
import java.util.List;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import fr.weflat.backend.domaine.Customer;
import fr.weflat.backend.domaine.Admin;
import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.User;
import fr.weflat.backend.service.UserService;

@Component
public class WeflatAuthenticationProvider implements AuthenticationProvider {
	@Autowired
	private UserService userService;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String login = (String) authentication.getPrincipal();
		String password = (String) authentication.getCredentials();
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		
		User user = userService.findByEmail(login.toLowerCase());
		
		if(user != null) {
			boolean isPasswordValid = new StrongPasswordEncryptor().checkPassword(password, user.getPassword());

			if(isPasswordValid) {
				if(user instanceof Customer) {
					list.add(new SimpleGrantedAuthority("customer"));
				}

				if(user instanceof Architect) {
					list.add(new SimpleGrantedAuthority("architect"));
				}

				if(user instanceof Admin) {
					list.add(new SimpleGrantedAuthority("admin"));
				}

				UsernamePasswordAuthenticationToken retour = new UsernamePasswordAuthenticationToken(
						login, password, list);

				retour.setDetails(user);

				return retour;
			}
		}
		return null;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
