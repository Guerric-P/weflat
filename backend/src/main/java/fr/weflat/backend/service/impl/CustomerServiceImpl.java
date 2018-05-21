package fr.weflat.backend.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.CustomerDao;
import fr.weflat.backend.domaine.Customer;
import fr.weflat.backend.service.CustomerService;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDao customerDao;
	
	@Override
	public Customer save(Customer customer) {
		return customerDao.save(customer);
		
	}

	@Override
	public Customer findById(Long id) {
		return customerDao.findOne(id);
	}

	@Override
	public Set<Customer> findAll() {
		Set<Customer> customer = new HashSet<Customer>();

		Iterable<Customer> result = customerDao.findAll();

		for(Customer row : result) {
			customer.add(row);
		}

		return customer;
	}

}
