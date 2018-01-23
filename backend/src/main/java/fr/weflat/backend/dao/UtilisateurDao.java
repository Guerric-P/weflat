package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.Utilisateur;

public interface UtilisateurDao extends CrudRepository<Utilisateur, Long>, QueryDslPredicateExecutor<Utilisateur> {
	Utilisateur findByEmailAndPassword(String email, String password);

	Utilisateur findByEmail(String email);
}
