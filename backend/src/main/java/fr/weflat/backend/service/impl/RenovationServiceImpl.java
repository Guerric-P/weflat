package fr.weflat.backend.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.weflat.backend.dao.RenovationDao;
import fr.weflat.backend.domaine.Renovation;
import fr.weflat.backend.service.RenovationService;

@Service
@Transactional
public class RenovationServiceImpl implements RenovationService {

	@Autowired
	private RenovationDao renovationDao;
	
	@Override
	public Renovation findById(long id) {
		return renovationDao.findOne(id);
	}

	@Override
	public void save(Renovation renovation) {
		renovationDao.save(renovation);
	}

}
