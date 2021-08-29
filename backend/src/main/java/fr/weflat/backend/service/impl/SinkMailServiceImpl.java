package fr.weflat.backend.service.impl;

import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.MailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Collection;
import java.util.Date;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

@Service
@Profile({"test", "production"})
public class SinkMailServiceImpl extends MailServiceImpl {

    @Value("${fr.weflat.app-url}")
    private String appUrl;

    @Override
    public CompletableFuture<Void> sendSimpleMail(String email, String subject, String text) throws Exception {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("rest-smtp-sink-svc");
        mailSender.setPort(25);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.debug", "true");

        try {

            mailSender.setDefaultEncoding("UTF-8");
            Message message = new MimeMessage(mailSender.getSession());
            message.setFrom(new InternetAddress(mailSender.getUsername()));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            message.setSubject(subject);

            text = "<img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"" + appUrl + "/assets/weflat_noir.png\" />" + text;
            message.setContent(text, "text/html; charset=UTF-8");

            mailSender.send((MimeMessage) message);

            logger.debug("Mail successfully sent to address:" + email + " with subject " + subject + " and message " + text);

            return CompletableFuture.completedFuture(null);

        } catch (Exception e) {
            logger.error("Error while sending mail :", e);
            return CompletableFuture.completedFuture(null);
        }
    }
}
