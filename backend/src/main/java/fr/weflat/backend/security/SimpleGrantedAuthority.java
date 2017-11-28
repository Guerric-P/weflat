package fr.weflat.backend.security;

import org.springframework.security.core.GrantedAuthority;

public class SimpleGrantedAuthority implements GrantedAuthority {

	@Override
	public String getAuthority() {
		return nom;
	}
	
	private String nom;

	public SimpleGrantedAuthority(String nom) {
		super();
		this.nom = nom;
	}

}
