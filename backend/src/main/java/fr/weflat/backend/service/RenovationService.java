package fr.weflat.backend.service;

import fr.weflat.backend.domaine.Renovation;

public interface RenovationService {
	Renovation getById(long id);
	
	void save(Renovation renovation);
}
