package fr.weflat.backend.service;

import fr.weflat.backend.domaine.ZipCode;

public interface ZipCodeService {
	ZipCode getById(Long id);
	
	ZipCode getByCode(String code);
	
	ZipCode save(ZipCode zipCode);
}
