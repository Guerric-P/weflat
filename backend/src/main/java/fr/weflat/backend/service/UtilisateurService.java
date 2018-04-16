package fr.weflat.backend.service;

import fr.weflat.backend.domaine.Utilisateur;

public interface UtilisateurService {
	
	Utilisateur findById(long id);
	
	Utilisateur getByEmailAndPassword(String email, String password);
	
	void save(Utilisateur utilisateur);
}
