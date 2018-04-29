package fr.weflat.backend.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.weflat.backend.dao.PaymentTypeDao;
import fr.weflat.backend.domaine.PaymentType;
import fr.weflat.backend.service.PaymentTypeService;

@Service
public class PaymentTypeServiceImpl implements PaymentTypeService{

	@Autowired
	private PaymentTypeDao paymentTypeDao;

	@Override
	public Set<PaymentType> getAll() {
		Set<PaymentType> paymentTypes = new HashSet<PaymentType>();
		
		Iterable<PaymentType> result = paymentTypeDao.findAll();
		
		for(PaymentType row : result) {
			paymentTypes.add(row);
		}
		
		return paymentTypes;
	}

}
