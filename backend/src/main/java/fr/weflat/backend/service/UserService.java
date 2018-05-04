package fr.weflat.backend.service;

import fr.weflat.backend.domaine.User;

public interface UserService {
	
	User findById(long id);
	
	User getByEmailAndPassword(String email, String password);
	
	User getByEmail(String email);
	
	void save(User utilisateur);
}
