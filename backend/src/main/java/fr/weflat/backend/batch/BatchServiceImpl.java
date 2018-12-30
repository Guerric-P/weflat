package fr.weflat.backend.batch;

import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.domaine.Visit;
import fr.weflat.backend.service.VisitService;

@Service
public class BatchServiceImpl implements BatchService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	VisitService visitService;
	
	@Override
	@Transactional
	public void refundNotAssignedVisits() {
		logger.info("Start automatic refund of past visits being assigned");
		
		Set<Visit> visits = visitService.findRefundableVisits();
		
		if(visits != null && visits.size() != 0) {
			logger.info("Found " + visits.size() + " visits to refund with IDs: " + visits.stream().map(x -> x.getId().toString()).collect(Collectors.joining(", ")));
			visits.forEach(x -> {
				logger.info("Refunding visit with ID: " + x.getId());
				try {
					refundVisit(x);
					logger.info("Visit successfully refunded!");
				}
				catch(Exception e) {
					logger.error("Error while refunding visit...", e);
				}
			});
		}
		else {
			logger.info("Found no visit to refund.");
		}
		
		logger.info("End of automatic refund");
	}
	
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void refundVisit(Visit visit) throws Exception {
		visitService.cancel(visit);
	}
}
