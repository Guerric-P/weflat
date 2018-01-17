package fr.weflat.backend.configuration;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {
	@Value("${fr.weflat.email.host}")
	private String host;
	
	@Value("${fr.weflat.email.port}")
	private int port;
	
	@Value("${fr.weflat.email.username}")
	private String userName;

	@Value("${mail.transport.protocol}")
	private String protocol;

	@Value("${mail.smtp.auth}")
	private String auth;
	
	@Value("${mail.smtp.auth.mechanisms}")
	private String mechanisms;
	
	@Value("${mail.smtp.starttls.enable}")
	private String startTLS;
	
	@Value("${mail.debug}")
	private String debug;

	
	@Bean
	public JavaMailSender javaMailService() {
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
		javaMailSender.setHost(host);
		javaMailSender.setPort(port);
		javaMailSender.setUsername(userName);
		javaMailSender.setProtocol(protocol);
		Properties props = new Properties();
		props.setProperty("mail.transport.protocol", protocol);
		props.setProperty("mail.smtp.auth", auth);
		props.setProperty("mail.smtp.auth.mechanisms", mechanisms);
		props.setProperty("mail.smtp.starttls.enable", startTLS);
		props.setProperty("mail.debug", debug);
		props.setProperty("mail.debug.auth", debug);
		javaMailSender.setJavaMailProperties(props);
		return javaMailSender;
	}
}
