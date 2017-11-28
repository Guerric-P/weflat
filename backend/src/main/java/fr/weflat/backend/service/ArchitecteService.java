package fr.weflat.backend.service;


import java.util.List;

import fr.weflat.backend.domaine.Architecte;

public interface ArchitecteService {
	Architecte getById(long id);
	
	void save(Architecte architecte);
	
	void saveZipCodesForArchitecte(List<String> zipCodes, long id);
}
