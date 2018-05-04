package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.Architect;

public interface ArchitectDao extends CrudRepository<Architect, Long>, QueryDslPredicateExecutor<Architect> {

}
