package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.Position;

public interface PositionDao extends CrudRepository<Position, Long>, QuerydslPredicateExecutor<Position>  {

}
