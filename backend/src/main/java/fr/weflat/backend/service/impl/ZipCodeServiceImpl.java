package fr.weflat.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import fr.weflat.backend.dao.ZipCodeDao;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.ZipCodeService;

public class ZipCodeServiceImpl implements ZipCodeService {
	@Autowired
	private ZipCodeDao zipCodeDao;
	
	public ZipCode findById(long id) {
		return zipCodeDao.findOne(id);
	}
}
