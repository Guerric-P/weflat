package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.ArchitectType;

public interface ArchitectTypeDao extends CrudRepository<ArchitectType, Long>, QuerydslPredicateExecutor<ArchitectType> {

}
