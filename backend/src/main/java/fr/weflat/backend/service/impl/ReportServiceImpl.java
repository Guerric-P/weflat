package fr.weflat.backend.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public Report getById(long id) {
		return reportDao.findOne(id);
	}

	@Override
	public void save(Report report) {
		reportDao.save(report);
	}

	@Override
	public Report getByVisiteId(long visiteId) {
		QReport report = QReport.report;
		
		Predicate predicate = report.visite.id.eq(visiteId);
		
		return reportDao.findOne(predicate);
	}

}
