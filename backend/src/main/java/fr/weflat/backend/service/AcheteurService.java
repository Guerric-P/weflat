package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Acheteur;

public interface AcheteurService {

	void save(Acheteur acheteur);
	
	Acheteur findById(Long id);
	
	Set<Acheteur> findAll();
}
