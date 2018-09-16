package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Visit;

public interface VisitService {
	Long save(Visit visite);
	
	void delete(Visit visite);
	
	void delete(Long id);
	
	Set<Visit> findAvailableVisitsByArchitectId(Long idArchitecte);
	
	Set<Visit> findPlannedVisitsByArchitectId(Long idArchitecte);
	
	Set<Visit> findReportPendingVisitsByArchitectId(Long idArchitecte);
	
	Set<Visit> findReportWrittenVisitsByArchitectId(Long idArchitecte);
	
	Set<Visit> findWaitingForPaymentVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findBeingAssignedVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findInProgressVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findReportBeingWrittenVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findReportWrittenVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findPlannedVisitsByAcheteurId(Long idAcheteur);
	
	Visit findById(Long id);
	
	Set<Visit> findAll();
	
	Visit createVisit(Visit visit, Long idAcheteur) throws Exception;
	
	Visit modifyVisit(Visit visit) throws Exception;
	
	Visit completeVisitCreation(Visit visit, Long idAcheteur) throws Exception;
	
	Visit pay(Visit visit, String token) throws Exception;
	
	Visit cancel(Visit visit) throws Exception;
	
	Visit changeStatusToArchitectWasPaid(Visit visit) throws Exception;
	
	void refund(Visit visit) throws Exception;
	
	void accept(Long idVisite, Long idArchitecte) throws Exception;
	
	void refuse(Long idVisite, Long idArchitecte) throws Exception;
	
	boolean isVisitComplete(Visit visit);

	void partialRefund(Visit visit) throws Exception;
	
	Long getVisitPrice();
	
	Long getVisitPartialRefundAmount();
	
	Long getAmountEarned(Long architectId);
	
	Long getDoneVisitsCount(Long architectId);

}
