package fr.weflat.backend.dao;

import java.util.Set;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.Architecte;

public interface ArchitecteDao extends CrudRepository<Architecte, Long>, QueryDslPredicateExecutor<Architecte> {
	Architecte findById(Long id);
}
