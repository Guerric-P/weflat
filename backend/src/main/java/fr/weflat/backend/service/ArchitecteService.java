package fr.weflat.backend.service;


import java.util.List;
import java.util.Set;

import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.ZipCode;

public interface ArchitecteService {
	Architecte getById(long id);
	
	void save(Architecte architecte);
	
	void saveZipCodesForArchitecte(List<ZipCode> zipCodes, long id);
	
	Set<Architecte> findNearbyArchitectes(String zipCode);
}
