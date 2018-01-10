package fr.weflat.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.ZipCodeDao;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.ZipCodeService;

@Service
@Transactional
public class ZipCodeServiceImpl implements ZipCodeService {
	@Autowired
	private ZipCodeDao zipCodeDao;
	
	public ZipCode findById(long id) {
		return zipCodeDao.findOne(id);
	}

	@Override
	public ZipCode getById(Long id) {
		return zipCodeDao.findOne(id);
	}

	@Override
	public ZipCode getByCode(String code) {
		// TODO Auto-generated method stub
		return zipCodeDao.findByNumber(code);
	}

	@Override
	public ZipCode save(ZipCode zipCode) {
		return zipCodeDao.save(zipCode);
	}
}
