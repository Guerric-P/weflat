package fr.weflat.backend.service;

import fr.weflat.backend.domaine.Report;

public interface ReportService {
	Report getById(long id);
	void save(Report report);
}
