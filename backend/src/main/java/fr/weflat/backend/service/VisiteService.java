package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Visite;

public interface VisiteService {
	Long save(Visite visite);
	
	Set<Visite> findAvailableVisits(Long idArchitecte);
	
	Set<Visite> findPlannedVisits(Long idArchitecte);
	
	Set<Visite> findReportPendingVisits(Long idArchitecte);
	
	Set<Visite> findReportWrittenVisits(Long idArchitecte);
	
	Visite getById(Long id);
	
	void createVisit(Visite visit, Long idAcheteur) throws Exception;
	
	void completeVisitCreation(Visite visit, Long idAcheteur) throws Exception;
	
	void pay(Visite visit, String token) throws Exception;
	
	void accept(Long idVisite, Long idArchitecte) throws Exception;
	
	void refuse(Long idVisite, Long idArchitecte) throws Exception;
	
	boolean isVisitComplete(Visite visit);

}
