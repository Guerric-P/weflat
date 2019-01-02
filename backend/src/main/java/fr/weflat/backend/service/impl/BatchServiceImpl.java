package fr.weflat.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.service.BatchService;
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
		
		List<Long> ids = visitService.findRefundableVisitsIds();
		
		if(ids != null && ids.size() != 0) {
			logger.info("Found " + ids.size() + " visits to refund with IDs: " + ids.stream().map(x -> x.toString()).collect(Collectors.joining(", ")));
			ids.forEach(x -> {
				logger.info("Refunding visit with ID: " + x);
				try {
					visitService.cancel(x);
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
}