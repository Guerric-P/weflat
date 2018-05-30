package fr.weflat.backend.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.UserDao;
import fr.weflat.backend.domaine.PasswordChangeRequest;
import fr.weflat.backend.domaine.User;
import fr.weflat.backend.service.PasswordChangeRequestService;
import fr.weflat.backend.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordChangeRequestService passwordChangeRequestService;

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
	public void forgottenPassword(String email, String host) {
		User user = findByEmail(email);
		char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789".toCharArray();
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
