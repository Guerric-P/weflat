package fr.weflat.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.RenovationDao;
import fr.weflat.backend.domaine.Renovation;
import fr.weflat.backend.service.RenovationService;

@Service
@Transactional
public class RenovationServiceImpl implements RenovationService {

	@Autowired
	private RenovationDao renovationDao;
	
	@Override
	@Transactional(readOnly=true)
	public Renovation findById(long id) {
		return renovationDao.findById(id).orElseThrow();
	}

	@Override
	public void save(Renovation renovation) {
		renovationDao.save(renovation);
	}

}
