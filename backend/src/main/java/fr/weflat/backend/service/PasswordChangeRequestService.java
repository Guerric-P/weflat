package fr.weflat.backend.service;

import fr.weflat.backend.domaine.PasswordChangeRequest;

public interface PasswordChangeRequestService {

	PasswordChangeRequest findByHash(String hash);
	
	PasswordChangeRequest save(PasswordChangeRequest passwordChangeRequest);
	
}
