package fr.weflat.backend.service;


import java.util.List;
import java.util.Set;

import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.ZipCode;

public interface ArchitectService {
	Architect findById(long id);
	
	Architect save(Architect architect);
	
	void saveZipCodesForArchitecte(List<ZipCode> zipCodes, long id);
	
	Set<Architect> findNearbyArchitectes(String zipCode);
	
	Set<Architect> findAll();
	
	boolean isProfileComplete(Architect architect);
	
	void accept(long id) throws Exception;
	
	void refuse(long id) throws Exception;

	Set<Architect> findValidatedArchitectsHavingZipCodes(Set<ZipCode> zipCodes);
}
