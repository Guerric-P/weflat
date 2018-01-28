package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Visite;

public interface VisiteService {
	void save(Visite visite);
	
	Set<Visite> findAvailableVisits(Long idArchitecte);
	
	Set<Visite> findPlannedVisits(Long idArchitecte);
	
	Set<Visite> findReportPendingVisits(Long idArchitecte);
	
	Set<Visite> findReportWrittenVisits(Long idArchitecte);
	
	Visite getById(Long id);
	
	void accept(Long idVisite, Long idArchitecte) throws Exception;
	
	void refuse(Long idVisite, Long idArchitecte) throws Exception;

}
