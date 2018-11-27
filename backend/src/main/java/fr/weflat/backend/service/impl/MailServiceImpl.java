package fr.weflat.backend.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.Set;
import java.util.TimeZone;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.google.api.client.util.IOUtils;

import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.MailService;

@Service
public class MailServiceImpl implements MailService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Value("${fr.weflat.email.service-account}")
	private String serviceAccount;
	
	@Value("${fr.weflat.email.scope}")
	private String scope;
	
	@Value("${fr.weflat.app-url}")
	private String appUrl;
	
	private Credential creds;
	
	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy à HH:mm");

	@PostConstruct
	public void initializeSdf(){
		sdf.setTimeZone(TimeZone.getTimeZone("GMT+1:00"));
	}

	@Async
	public CompletableFuture<Void> sendSimpleMail(String email, String subject, String text) throws Exception {

		if(creds == null) {
			final HttpTransport TRANSPORT = new NetHttpTransport();
		    final JsonFactory JSON_FACTORY = new JacksonFactory();
		    final InputStream stream = Thread.currentThread().getContextClassLoader().getResourceAsStream("file:config/Weflat-d8a5d9785c54.p12");
		    File file = new File("Weflat-d8a5d9785c54.p12");
		    FileOutputStream fos = new FileOutputStream(file);
		    IOUtils.copy(stream, fos);
		    
			creds = new GoogleCredential.Builder()
			    .setTransport(TRANSPORT)
			    .setJsonFactory(JSON_FACTORY)
			    .setServiceAccountId(serviceAccount)
			    .setServiceAccountPrivateKeyFromP12File(file)
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
			
			text = "<img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"" + appUrl + "/assets/weflat_noir.png\" />" + text;
			message.setContent(text, "text/html; charset=UTF-8");

			javaMailSender.send((MimeMessage)message);
			
			logger.debug("Mail successfully sent to address:" + email + " with subject " + subject + " and message " + text);
			
			return CompletableFuture.completedFuture(null);

		} catch (Exception e) {
			logger.error("Error while sending mail :", e);
			throw e;
		}
	}

	@Override
	public void sendArchitectSignupMail(String email, String firstName) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(firstName);
		messageBuilder.append(",</p>");
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
	public void sendVisitAttributionMail(String email, String architectFirstName,
			String customerFirstName, String address, Date date) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(architectFirstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>Félicitations! La visite de ");
		messageBuilder.append(customerFirstName);
		messageBuilder.append(" vous a été attribuée.</p>");
		messageBuilder.append("<p>Pour rappel, la visite a lieu le </p>");
		messageBuilder.append(sdf.format(date));
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
		messageBuilder.append(sdf.format(date));
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
		messageBuilder.append("<p>Toute l’équipe Weflat vous souhaite la bienvenue. Weflat et l’ensemble de la communauté des architectes espérons vous satisfaire à l’occasion de votre première visite de bien immobilier.</p>");
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
		messageBuilder.append(sdf.format(date));
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
		messageBuilder.append(sdf.format(date));
		messageBuilder.append(". Rien de plus simple, l’architecte sera présent à l’adresse et l’horaire mentionné.</p>");
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

	@Override
	public void sendPasswordResetMail(String email, String firstName, String url) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(firstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>Nous avons reçu une demande de réinitialisation de mot de passe de votre part.</p>");
		messageBuilder.append("<p>Vous pourrez définir un nouveau mot de passe en cliquant sur le lien suivant : ");
		messageBuilder.append("<a href=\"");
		messageBuilder.append(url);
		messageBuilder.append("\">");
		messageBuilder.append(url);
		messageBuilder.append("</a></p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Réinitialisation de mot de passe",
				messageBuilder.toString());
	}
	
	@Override
	public void sendFullRefundMail(String email, String firstName, Date date, String address) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(firstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>Nous vous confirmons avoir procédé à un remboursement intégral concernant votre demande de visite planifiée le ");
		messageBuilder.append(sdf.format(date));
		messageBuilder.append(" à l'adresse suivante: ");
		messageBuilder.append(address);
		messageBuilder.append(".</p>");
		messageBuilder.append("<p>A bientôt.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Remboursement total",
				messageBuilder.toString());
	}
	
	@Override
	public void sendPartialRefundMail(String email, String firstName, Date date, String address, Long amount) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy à HH:mm");
		String formattedDate = sdf.format(date);
		
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(firstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>Nous vous confirmons avoir procédé à un remboursement partiel de ");
		messageBuilder.append(amount/100);
		messageBuilder.append(" € concernant votre demande de visite planifiée le ");
		messageBuilder.append(formattedDate);
		messageBuilder.append(" à l'adresse suivante: ");
		messageBuilder.append(address);
		messageBuilder.append(".</p>");
		messageBuilder.append("<p>A bientôt.</p>");
		messageBuilder.append("<p>Cordialement,</p>");
		messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Remboursement partiel",
				messageBuilder.toString());
	}
	
	@Override
	public void sendWelcomeValidatedArchitectMail(String email, String firstName) throws Exception {
		StringBuilder messageBuilder = new StringBuilder();
		
		messageBuilder.append("<p>Bonjour ");
		messageBuilder.append(firstName);
		messageBuilder.append(",</p>");
		messageBuilder.append("<p>Félicitations ! Tu fais partie de la communauté des architectes Weflat et tu vas pouvoir désormais visiter des biens immobiliers dans ta zone d'action avec des acheteurs potentiels.</p>");
		messageBuilder.append("<p>");
		messageBuilder.append("Lors de ta première visite, nous te recommandons de lire attentivement les infos présentes dans ton espace personnel.");
		messageBuilder.append("<ul>");
		messageBuilder.append("<li>Comment bien visiter avec un acheteur? Cliquer sur \"Aide\" dans Mes visites > Mes visites programmées.</li>");
		messageBuilder.append("<li>Comment bien remplir le compte rendu? Cliquer sur \"Aide\", bouton accessible lors de la rédaction de chaque compte rendu.</li>");
		messageBuilder.append("</ul>");
		messageBuilder.append("</p>");
		messageBuilder.append("<p>Au regard de ton profil, nous sommes certains que tu atteindras les standards d'exigences Weflat et que tu aideras également à les dépasser.</p>");
		messageBuilder.append("<p>Bonnes visites !</p>");
		messageBuilder.append("<p>Pour toute autre question, n'hésite pas à nous contacter directement par mail <a href=\"contact@weflat.fr\">contact@weflat.fr</a></p>");
		messageBuilder.append("<p>Cordialement,");
		messageBuilder.append("<br>");
		messageBuilder.append("L'équipe Weflat &hearts;</p>");
		
		sendSimpleMail(email,
				"Votre inscription Weflat a été approuvée",
				messageBuilder.toString());
	}
	
	@Override
	public void sendZipCodeActivatedMail(Set<Architect> architects, Collection<ZipCode> zipCodes) throws Exception {
		String stringifiedZipCodes = zipCodes.stream().map(x -> x.getNumber()).collect(Collectors.joining(", "));
		
		for(Architect architect: architects) {
			StringBuilder messageBuilder = new StringBuilder();
			
			messageBuilder.append("<p>Bonjour ");
			messageBuilder.append(architect.getFirstName());
			messageBuilder.append(",</p>");
			messageBuilder.append("<p>Par le passé, Weflat ne couvrait pas une partie voire la totalité de ta zone d'action. Nous sommes heureux de t'annoncer que les zones suivantes sont désormais éligibles à des visites Weflat :</p>");
			messageBuilder.append("<p>");
			messageBuilder.append(stringifiedZipCodes);
			messageBuilder.append(".</p>");
			messageBuilder.append("<p>Aucune action n'est requise de ta part, tu seras notifié de nouvelles demandes de visites et tu devras accepter ou refuser l'attribution.</p>");
			messageBuilder.append("<p>Bonnes visites !</p>");
			messageBuilder.append("<p>Cordialement,</p>");
			messageBuilder.append("<br>");
			messageBuilder.append("<p>L'équipe Weflat &hearts;</p>");
			
			String body = messageBuilder.toString();
			
			sendSimpleMail(architect.getEmail(),
				"Une nouvelle zone est ouverte !",
				body);
		}
		
	}
}

