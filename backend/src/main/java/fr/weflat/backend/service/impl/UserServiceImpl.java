package fr.weflat.backend.service.impl;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.UserDao;
import fr.weflat.backend.domaine.User;
import fr.weflat.backend.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;

	@Override
	public 	User getByEmailAndPassword(String email, String password) {
		return userDao.findByEmailAndPassword(email, password);
	}

	@Override
	public User findById(long id) {
		return userDao.findOne(id);
	}

	@Override
	public void save(User utilisateur) {
		userDao.save(utilisateur);
		
	}

	@Override
	public User getByEmail(String email) {
		return userDao.findByEmail(email);
	}

	@Override
	public void changePassword(long userId, String password) {
		User user = findById(userId);
		user.setPassword(new StrongPasswordEncryptor().encryptPassword(password));
		save(user);
	}
	
	
}
