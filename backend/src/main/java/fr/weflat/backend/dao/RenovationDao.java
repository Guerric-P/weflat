package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.Renovation;

public interface RenovationDao extends CrudRepository<Renovation, Long>, QuerydslPredicateExecutor<Renovation> {

}
