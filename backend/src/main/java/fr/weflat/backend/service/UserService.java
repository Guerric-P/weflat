package fr.weflat.backend.service;

import fr.weflat.backend.domaine.User;

public interface UserService {
	
	User findById(long id);
	
	User findByEmailAndPassword(String email, String password);
	
	User findByEmail(String email);
	
	void save(User user);
	
	void changePassword(long userId, String password);

	void forgottenPassword(String email) throws Exception;

	void resetPassword(String hash, String newPassword) throws Exception;
}
