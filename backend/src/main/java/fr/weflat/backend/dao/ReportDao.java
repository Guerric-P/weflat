package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.Report;

public interface ReportDao extends CrudRepository<Report, Long>, QueryDslPredicateExecutor<Report> {

}
