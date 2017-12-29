package fr.weflat.backend.service;

import fr.weflat.backend.domaine.Acheteur;

public interface AcheteurService {

	void save(Acheteur acheteur);
	
	Acheteur findById(Long id);
}
