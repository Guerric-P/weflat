package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.ArchitectSituation;

public interface ArchitectSituationDao extends CrudRepository<ArchitectSituation, Long>, QuerydslPredicateExecutor<ArchitectSituation> {

}
