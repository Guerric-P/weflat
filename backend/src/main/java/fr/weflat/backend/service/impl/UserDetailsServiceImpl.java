package fr.weflat.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import fr.weflat.backend.dao.UtilisateurDao;

public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UtilisateurDao utilisateurDao;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

}
