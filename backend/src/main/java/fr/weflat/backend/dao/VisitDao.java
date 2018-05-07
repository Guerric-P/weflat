package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.Visit;

public interface VisitDao  extends CrudRepository<Visit, Long>, QueryDslPredicateExecutor<Visit> {

}
