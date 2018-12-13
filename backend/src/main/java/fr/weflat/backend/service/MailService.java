package fr.weflat.backend.service;

import java.util.Collection;
import java.util.Date;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.ZipCode;

public interface MailService {
	
	CompletableFuture<Void> sendSimpleMail(String email, String subject, String text) throws Exception;
	
	void sendArchitectSignupMail(String email, String firstName) throws Exception;
	
	void sendVisitAttributionMail(String email, String architectFirstName, String customerFirstName, String address,
			Date date, String announcementUrl, String customerProject) throws Exception;
	
	void sendVisitAvailableMail(String email, String architectFirstName, String customerFirstName, String address, Date date) throws Exception;
	
	void sendCustomerSignupMail(String email, String firstName) throws Exception;
	
	void sendVisitCreationMail(String email, String firstName, String address, Date date) throws Exception;
	
	void sendVisitAssignedMail(String email, String architectFirstName, String customerFirstName, String address, Date date) throws Exception;
	
	void sendReportReadyMail(String email, String architectFirstName, String customerFirstName) throws Exception;
	
	void sendPasswordResetMail(String email, String firstName, String url) throws Exception;

	void sendFullRefundMail(String email, String firstName, Date date, String address) throws Exception;

	void sendPartialRefundMail(String email, String firstName, Date date, String address, Long amount) throws Exception;

	void sendWelcomeValidatedArchitectMail(String email, String firstName) throws Exception;

	void sendZipCodeActivatedMail(Set<Architect> architects, Collection<ZipCode> mergedZipCodes) throws Exception;

}
