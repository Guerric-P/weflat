package fr.weflat.backend.batch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduler {
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	BatchService batchService;
	
	@Scheduled(cron = "0 */5 * ? * *")
	void tick() {
		logger.info("Beginning of a batch tick");
		batchService.refundNotAssignedVisits();
		logger.info("End of the batch tick");
	}
}
