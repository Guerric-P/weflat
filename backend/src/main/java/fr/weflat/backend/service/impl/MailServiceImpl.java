package fr.weflat.backend.service.impl;

import java.io.File;
import java.net.URL;
import java.util.Collections;
import java.util.concurrent.CompletableFuture;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import fr.weflat.backend.service.MailService;

@Service
public class MailServiceImpl implements MailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Value("${fr.weflat.email.service-account}")
	private String serviceAccount;
	
	@Value("${fr.weflat.email.scope}")
	private String scope;
	
	private Credential creds;

	@Async
	public CompletableFuture<Void> sendSimpleMail(String email, String subject, String text) throws Exception {

		if(creds == null) {
			final HttpTransport TRANSPORT = new NetHttpTransport();
		    final JsonFactory JSON_FACTORY = new JacksonFactory();
		    final URL URL = Thread.currentThread().getContextClassLoader().getResource("Weflat-d8a5d9785c54.p12");
		    
			creds = new GoogleCredential.Builder()
			    .setTransport(TRANSPORT)
			    .setJsonFactory(JSON_FACTORY)
			    .setServiceAccountId(serviceAccount)
			    .setServiceAccountPrivateKeyFromP12File(new File(URL.getFile()))
			    .setServiceAccountScopes(Collections.singleton(scope))
			    .setServiceAccountUser(((JavaMailSenderImpl)javaMailSender).getUsername())
			    .build();
		}
		
		if(creds.getExpiresInSeconds() != null && creds.getExpiresInSeconds() < 0 || creds.getAccessToken() == null) {
			creds.refreshToken();
		}

		try {

			((JavaMailSenderImpl)javaMailSender).setPassword(creds.getAccessToken());
			Message message = new MimeMessage(((JavaMailSenderImpl)javaMailSender).getSession());
			message.setFrom(new InternetAddress(((JavaMailSenderImpl)javaMailSender).getUsername()));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
			message.setSubject(subject);
			message.setText(text);

			javaMailSender.send((MimeMessage)message);
			
			return CompletableFuture.completedFuture(null);

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}
}

