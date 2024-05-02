package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.ZipCode;

public interface ZipCodeDao extends CrudRepository<ZipCode, Long>, QuerydslPredicateExecutor<ZipCode> {

	ZipCode findByNumber(String number);
}
