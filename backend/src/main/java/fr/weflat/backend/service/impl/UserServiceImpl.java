package fr.weflat.backend.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.UserDao;
import fr.weflat.backend.domaine.PasswordChangeRequest;
import fr.weflat.backend.domaine.User;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.PasswordChangeRequestService;
import fr.weflat.backend.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordChangeRequestService passwordChangeRequestService;
	
	@Autowired
	private MailService mailService;
	
	@Value("${fr.weflat.app-url}")
	private String appUrl;

	@Override
	public 	User getByEmailAndPassword(String email, String password) {
		return userDao.findByEmailAndPassword(email, password);
	}

	@Override
	public User findById(long id) {
		return userDao.findOne(id);
	}

	@Override
	public void save(User user) {
		userDao.save(user);
		
	}

	@Override
	public User findByEmail(String email) {
		return userDao.findByEmail(email);
	}

	@Override
	public void changePassword(long userId, String password) {
		User user = findById(userId);
		user.setPassword(new StrongPasswordEncryptor().encryptPassword(password));
		save(user);
	}

	@Override
	public void forgottenPassword(String email) throws Exception {
		User user = findByEmail(email);
		if(user == null) {
			throw new Exception("Email does not exist");
		}
		else {
			char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".toCharArray();
			StringBuilder sb = new StringBuilder(20);
			Random random = new Random();
			for (int i = 0; i < 40; i++) {
				char c = chars[random.nextInt(chars.length)];
				sb.append(c);
			}
			String generatedString = sb.toString();

			Date currentDate = new Date();
			Calendar c = Calendar.getInstance();
			c.setTime(currentDate);
			c.add(Calendar.DATE, 1);
			Date currentDatePlusOne = c.getTime();

			PasswordChangeRequest passwordChangeRequest = new PasswordChangeRequest(user, generatedString, currentDatePlusOne);
			passwordChangeRequestService.save(passwordChangeRequest);

			mailService.sendPasswordResetMail(email, user.getFirstName(), appUrl + "/forgotten-password?hash=" + generatedString);
		}
	}

	@Override
	public void resetPassword(String hash, String newPassword) throws Exception {
		PasswordChangeRequest changePasswordRequest = passwordChangeRequestService.findByHash(hash);
		if(changePasswordRequest == null) {
			throw new Exception("Hash does not exist.");
		}
		else if(changePasswordRequest.getExpirationDate().compareTo(new Date()) < 0) {
			throw new Exception("Change password request has expired.");
		}
		else {
			User user = changePasswordRequest.getUser();
			user.getPasswordChangeRequests().clear();
			user.setPassword(new StrongPasswordEncryptor().encryptPassword(newPassword));
			save(user);
		}
	}
}
