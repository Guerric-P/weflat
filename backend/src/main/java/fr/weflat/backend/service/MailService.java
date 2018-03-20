package fr.weflat.backend.service;

import java.util.concurrent.CompletableFuture;

public interface MailService {
	
	CompletableFuture<Void> sendSimpleMail(String email, String subject, String text) throws Exception;
}
