package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.ZipCode;

public interface ZipCodeService {
	ZipCode findById(Long id);
	
	ZipCode getByCode(String code);
	
	ZipCode save(ZipCode zipCode);
	
	Set<ZipCode> getZipCodesByNumbers(Set<String> numbers);
	
	Set<ZipCode> getZipCodesByNumbersStartingWith(String string);
}
