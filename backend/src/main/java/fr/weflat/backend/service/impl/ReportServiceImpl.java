package fr.weflat.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Predicate;

import fr.weflat.backend.dao.ReportDao;
import fr.weflat.backend.domaine.QReport;
import fr.weflat.backend.domaine.Report;
import fr.weflat.backend.service.ReportService;

@Service
@Transactional
public class ReportServiceImpl implements ReportService {

	@Autowired
	private ReportDao reportDao;
	
	@Override
	@Transactional(readOnly=true)
	public Report findById(long id) {
		return reportDao.findById(id).orElseThrow();
	}

	@Override
	public void save(Report report) {
		reportDao.save(report);
	}

	@Override
	@Transactional(readOnly=true)
	public Report findByVisitId(long visiteId) {
		QReport report = QReport.report;
		
		Predicate predicate = report.visite.id.eq(visiteId);
		
		return reportDao.findOne(predicate).orElseThrow();
	}

}
