package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.PasswordChangeRequest;

public interface PasswordChangeRequestDao extends CrudRepository<PasswordChangeRequest, Long>, QueryDslPredicateExecutor<PasswordChangeRequest> {

}
