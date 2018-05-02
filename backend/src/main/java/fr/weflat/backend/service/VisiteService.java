package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Visite;

public interface VisiteService {
	Long save(Visite visite);
	
	Set<Visite> findAvailableVisitsByArchitectId(Long idArchitecte);
	
	Set<Visite> findPlannedVisitsByArchitectId(Long idArchitecte);
	
	Set<Visite> findReportPendingVisitsByArchitectId(Long idArchitecte);
	
	Set<Visite> findReportWrittenVisitsByArchitectId(Long idArchitecte);
	
	Set<Visite> findWaitingForPaymentVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visite> findBeingAssignedVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visite> findInProgressVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visite> findReportBeingWrittenVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visite> findReportWrittenVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visite> findPlannedVisitsByAcheteurId(Long idAcheteur);
	
	Visite findById(Long id);
	
	void createVisit(Visite visit, Long idAcheteur) throws Exception;
	
	void completeVisitCreation(Visite visit, Long idAcheteur) throws Exception;
	
	void pay(Visite visit, String token) throws Exception;
	
	void cancel(Visite visit) throws Exception;
	
	void refund(Visite visit) throws Exception;
	
	void accept(Long idVisite, Long idArchitecte) throws Exception;
	
	void refuse(Long idVisite, Long idArchitecte) throws Exception;
	
	boolean isVisitComplete(Visite visit);

	void partialRefund(Visite visit) throws Exception;

}
