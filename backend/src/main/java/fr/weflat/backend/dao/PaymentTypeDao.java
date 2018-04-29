package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.PaymentType;

public interface PaymentTypeDao extends CrudRepository<PaymentType, Long>, QueryDslPredicateExecutor<PaymentType> {

}
