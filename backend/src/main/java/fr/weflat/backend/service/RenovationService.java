package fr.weflat.backend.service;

import fr.weflat.backend.domaine.Renovation;

public interface RenovationService {
	Renovation findById(long id);
	
	void save(Renovation renovation);
}
