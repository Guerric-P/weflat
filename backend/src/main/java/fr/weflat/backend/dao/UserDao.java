package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.User;

public interface UserDao extends CrudRepository<User, Long>, QueryDslPredicateExecutor<User> {
	User findByEmailAndPassword(String email, String password);

	User findByEmail(String email);
}
