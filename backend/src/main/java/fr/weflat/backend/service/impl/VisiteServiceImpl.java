package fr.weflat.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.weflat.backend.dao.VisiteDao;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.service.VisiteService;

@Service
public class VisiteServiceImpl implements VisiteService {
	@Autowired
	private VisiteDao visiteDao;

	@Override
	public void save(Visite visite) {
		visiteDao.save(visite);
	}
}
