package fr.weflat.backend.service;

public interface MailService {
	
	void sendSimpleMail(String email, String subject, String text) throws Exception;
}
