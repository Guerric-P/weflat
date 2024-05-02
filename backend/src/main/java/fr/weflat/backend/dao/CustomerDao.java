package fr.weflat.backend.dao;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import fr.weflat.backend.domaine.Customer;

public interface CustomerDao extends CrudRepository<Customer, Long>, QuerydslPredicateExecutor<Customer> {

}
