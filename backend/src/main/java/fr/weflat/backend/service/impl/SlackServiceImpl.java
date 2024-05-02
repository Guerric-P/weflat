package fr.weflat.backend.service.impl;

import fr.weflat.backend.service.SlackService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.github.seratch.jslack.*;
import com.github.seratch.jslack.api.webhook.*;
import jakarta.annotation.PostConstruct;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class SlackServiceImpl implements SlackService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Value("${fr.weflat.slack.url}")
	private String slackURL;
	
	Slack slack = Slack.getInstance();
	
	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy à HH:mm");

	@PostConstruct
	public void initializeSdf(){
		sdf.setTimeZone(TimeZone.getTimeZone("GMT+1:00"));
	}
	
	@Override
	public void sendMessage(String text) {
		Payload payload = Payload.builder()
				.text(text)
				.build();
		try {
			WebhookResponse response = slack.send(slackURL, payload);
			logger.debug("Slack returned code : " + response.getCode() + " with message " + response.getMessage() + "  " + response.getBody());
		} catch (Exception e) {
			logger.error("Error while sending message to Slack", e);
		}
	}
	
	@Override
	public void sendNewPendingArchitectMessage(String firstName, String lastName) {
		StringBuilder builder = new StringBuilder();
		builder.append("L'architecte ");
		builder.append(firstName);
		builder.append(" ");
		builder.append(lastName);
		builder.append(" vient de compléter son profil.");
		sendMessage(builder.toString());
	}
	
	@Override
	public void sendNewVisit(String firstName, String lastName, String address, Date date) {
		StringBuilder builder = new StringBuilder();
		builder.append(firstName);
		builder.append(" ");
		builder.append(lastName);
		builder.append(" veut visiter au ");
		builder.append(address);
		builder.append(" le ");
		builder.append(sdf.format(date));
		builder.append(".");
		sendMessage(builder.toString());
	}
	
	@Override
	public void sendArchitectAcceptedVisit(String customerFirstname, String customerLastname, String architectFirstName, String architectLastname, String address, Date date) {
		StringBuilder builder = new StringBuilder();
		builder.append(architectFirstName);
		builder.append(" ");
		builder.append(architectLastname);
		builder.append(" a accepté la visite de ");
		builder.append(customerFirstname);
		builder.append(" ");
		builder.append(customerLastname);
		builder.append(" au ");
		builder.append(address);
		builder.append(" le ");
		builder.append(sdf.format(date));
		builder.append(".");
		sendMessage(builder.toString());
	}
	
	@Override
	public void sendReportSubmitted(String customerFirstname, String customerLastname, String architectFirstName, String architectLastname, String address, Date date) {
		StringBuilder builder = new StringBuilder();
		builder.append(architectFirstName);
		builder.append(" ");
		builder.append(architectLastname);
		builder.append(" a soumis son rapport pour la visite de ");
		builder.append(customerFirstname);
		builder.append(" ");
		builder.append(customerLastname);
		builder.append(" au ");
		builder.append(address);
		builder.append(" le ");
		builder.append(sdf.format(date));
		builder.append(".");
		sendMessage(builder.toString());
	}
}
