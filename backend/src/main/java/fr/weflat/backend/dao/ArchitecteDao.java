package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.Architecte;

public interface ArchitecteDao extends CrudRepository<Architecte, Long>, QueryDslPredicateExecutor<Architecte> {

}
