package fr.weflat.backend.service.impl;

import java.io.File;
import java.net.URL;
import java.util.Collections;
import java.util.Date;
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
			
			((JavaMailSenderImpl)javaMailSender).setDefaultEncoding("UTF-8");
			((JavaMailSenderImpl)javaMailSender).setPassword(creds.getAccessToken());
			Message message = new MimeMessage(((JavaMailSenderImpl)javaMailSender).getSession());
			message.setFrom(new InternetAddress(((JavaMailSenderImpl)javaMailSender).getUsername()));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
			message.setSubject(subject);
			message.setContent(text, "text/html; charset=UTF-8");

			javaMailSender.send((MimeMessage)message);
			
			return CompletableFuture.completedFuture(null);

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void sendArchitectSignupMail(String email, String firstName) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(firstName);
		messageBuilder.append("</p>");
		messageBuilder.append("<p>Nous avons bien enregistré votre demande d'inscription à la communauté d'architectes weflat et vous en remercions. Votre statut est « profil créé ». Vous ne pouvez pas encore recevoir de demande de visite car votre profil doit être approuvé.<p>");
		messageBuilder.append("<p>Merci d’enrichir votre profil architecte afin que votre inscription soit étudiée par nos équipes :</p>");
		messageBuilder.append("<ul>");
		messageBuilder.append("<li>Zone d’action : un code postal minimum</li>");
		messageBuilder.append("<li>Section \"Mon métier d'architecte\"</li>");
		messageBuilder.append("<li>Section \"Weflat et moi\"</li>");
		messageBuilder.append("</ul>");
		messageBuilder.append("<p>Si votre inscription approuvée, vous recevrez les demandes de visites d’acheteurs.</p>");
		messageBuilder.append("<p>Merci de noter que la vérification de votre profil peut prendre 3 a 4 jours ouvrés.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Bienvenue chez Weflat",
				messageBuilder.toString());
	}

	@Override
	public void sendVerifiedArchitectMail(String email, String firstName) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(firstName);
		messageBuilder.append("</p>");
		messageBuilder.append("<p>Toute l’equipe Weflat est très heureuse de vous accueillir au sein de la communauté des architectes Weflat. Vous recevrez désormais les demandes de visites Weflat.</p>");
		messageBuilder.append("<p>N’hésitez pas à nous contacter directement par email à l’adresse <a href=\"mailto:contact@weflat.fr\">contact@weflat.fr</a> pour toute question supplémentaire.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Votre inscription Weflat a été approuvée",
				messageBuilder.toString());
	}

	@Override
	public void sendVisitAttributionMail(String email, String architectFirstName,
			String customerFirstName, String address, Date date) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(architectFirstName);
		messageBuilder.append("</p>");
		messageBuilder.append("<p>Félicitations! La visite de ");
		messageBuilder.append(customerFirstName);
		messageBuilder.append(" vous a été attribuée.</p>");
		messageBuilder.append("<p>Pour rappel, la visite a lieu le </p>");
		messageBuilder.append(date.toLocaleString());
		messageBuilder.append(" à l’adresse suivante : ");
		messageBuilder.append(address);
		messageBuilder.append(".</p>");
		messageBuilder.append("<p>Les coordonnées de l’acheteur ainsi que son projet d’achat sont disponibles dans votre espace personnel > Mes visites >  Mes visites programmées. Vous avez jusqu'à 12 heures ouvrées après la visite pour soumettre le compte rendu digitalisé sur la plateforme Weflat.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"La visite de " + customerFirstName + " vous a été attribuée",
				messageBuilder.toString());
	}

	@Override
	public void sendVisitAvailableMail(String email, String architectFirstName,
			String customerFirstName, String address, Date date) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(architectFirstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>");
		messageBuilder.append(customerFirstName);
		messageBuilder.append(" souhaite visiter un bien immobilier dans votre zone d’action le ");
		messageBuilder.append(date.toLocaleString());
		messageBuilder.append(". Connectez-vous à votre compte personnel weflat pour accompagner cet acheteur.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				customerFirstName + " souhaite visiter avec Weflat",
				messageBuilder.toString());
		
	}

	@Override
	public void sendCustomerSignupMail(String email, String firstName) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(firstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>Toute l’équipe Weflat vous souhaite la bienvenue. Nous vous remercions de l’intérêt que vous portez à Weflat et l’ensemble de la communauté des architectes espérons vous satisfaire à l’occasion de votre première visite de bien immobilier.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Bienvenue chez Weflat",
				messageBuilder.toString());
		
	}

	@Override
	public void sendVisitCreationMail(String email, String firstName, String address, Date date) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(firstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>Nous avons bien enregistré votre demande de visite et accusons réception du paiement.</p>");
		messageBuilder.append("<p>Voici le récapitulatif de votre demande:</p>");
		messageBuilder.append("<ul>");
		messageBuilder.append("<li>");
		messageBuilder.append(date.toLocaleString());
		messageBuilder.append("</li>");
		messageBuilder.append("<li>");
		messageBuilder.append(address);
		messageBuilder.append("</li>");
		messageBuilder.append("</ul>");
		messageBuilder.append("<p>Vous recevrez un mail de confirmation lorsqu’un de nos architectes sera attribué à votre visite. Vous pouvez voir le statut de votre visite à tout moment dans votre espace personnel.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Bienvenue chez Weflat",
				messageBuilder.toString());
		
	}

	@Override
	public void sendVisitAssignedMail(String email, String architectFirstName,
			String customerFirstName, String address, Date date) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(customerFirstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>");
		messageBuilder.append(architectFirstName);
		messageBuilder.append(" vous accompagnera lors de votre visite du bien situé au ");
		messageBuilder.append(address);
		messageBuilder.append(" le ");
		messageBuilder.append(date.toLocaleString());
		messageBuilder.append(". Rien de plus simple, l’architecte sera présent à l’adresse et l’horaire mentionné.</p>");
		messageBuilder.append("<p>Vous pouvez d’ores et déjà discuter avec lui par mail.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Un architecte a été attribué à votre visite",
				messageBuilder.toString());
	}

	@Override
	public void sendReportReadyMail(String email, String architectFirstName,
			String customerFirstName) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(customerFirstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>Suite à votre visite, ");
		messageBuilder.append(architectFirstName);
		messageBuilder.append(" a rempli le compte rendu. Il est d’ores et déjà disponible dans votre espace personnel.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Le compte rendu de votre visite est disponible",
				messageBuilder.toString());
	}
}

