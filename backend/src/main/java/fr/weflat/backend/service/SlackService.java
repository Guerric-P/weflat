package fr.weflat.backend.service;

import java.util.Date;

public interface SlackService {

	void sendNewPendingArchitectMessage(String firstName, String lastName);

	void sendArchitectAcceptedVisit(String customerFirstname, String customerLastname, String architectFirstName,
			String architectLastname, String address, Date date);

	void sendNewVisit(String firstName, String lastName, String address, Date date);

	void sendMessage(String text);

	void sendReportSubmitted(String customerFirstname, String customerLastname, String architectFirstName,
			String architectLastname, String address, Date date);

}
