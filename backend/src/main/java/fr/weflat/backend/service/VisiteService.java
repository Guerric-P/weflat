package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.Visite;

public interface VisiteService {
	void save(Visite visite);
	
	Set<Visite> findNearbyVisites(Long idArchitecte);
}
