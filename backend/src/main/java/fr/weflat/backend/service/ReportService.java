package fr.weflat.backend.service;

import fr.weflat.backend.domaine.Report;

public interface ReportService {
	Report findById(long id);
	void save(Report report);
	Report findByVisitId(long visiteId);
}
