package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Visite;

public interface VisiteService {
	void save(Visite visite);
	
	Set<Visite> findNearbyVisites(Long idArchitecte);
	
	void accept(Long idVisite, Long idArchitecte) throws Exception;
	
	void refuse(Long idVisite, Long idArchitecte) throws Exception;
	
	Set<Visite> findPlannedVisites(Long idArchitecte);
}
