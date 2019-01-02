package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.ZipCode;

public interface ZipCodeService {
	ZipCode findById(Long id);
	
	ZipCode findByCode(String code);
	
	ZipCode save(ZipCode zipCode);
	
	Set<ZipCode> findZipCodesByNumbers(Set<String> numbers);
	
	Set<ZipCode> findZipCodesByNumbersStartingWith(String string);
	
	void deleteById(long id);

	Set<ZipCode> bulkUpdate(Set<ZipCode> zipCodes) throws Exception;
}
