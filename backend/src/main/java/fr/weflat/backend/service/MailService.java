package fr.weflat.backend.service;

import java.util.Date;
import java.util.concurrent.CompletableFuture;

public interface MailService {
	
	CompletableFuture<Void> sendSimpleMail(String email, String subject, String text) throws Exception;
	
	void sendArchitectSignupMail(String email, String firstName) throws Exception;
	
	void sendVerifiedArchitectMail(String email, String firstName) throws Exception;
	
	void sendVisitAttributionMail(String email, String architectFirstName, String customerFirstName, String address, Date date) throws Exception;
	
	void sendVisitAvailableMail(String email, String architectFirstName, String customerFirstName, String address, Date date) throws Exception;
	
	void sendCustomerSignupMail(String email, String firstName) throws Exception;
	
	void sendVisitCreationMail(String email, String firstName, String address, Date date) throws Exception;
	
	void sendVisitAssignedMail(String email, String architectFirstName, String customerFirstName, String address, Date date) throws Exception;
	
	void sendReportReadyMail(String email, String architectFirstName, String customerFirstName) throws Exception;
	
	void sendPasswordResetMail(String email, String firstName, String url) throws Exception;
}
