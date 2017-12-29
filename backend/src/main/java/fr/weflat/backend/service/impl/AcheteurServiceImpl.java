package fr.weflat.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.weflat.backend.dao.AcheteurDao;
import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.service.AcheteurService;

@Service
public class AcheteurServiceImpl implements AcheteurService {

	@Autowired
	private AcheteurDao acheteurDao;
	
	@Override
	public void save(Acheteur acheteur) {
		acheteurDao.save(acheteur);
		
	}

	@Override
	public Acheteur findById(Long id) {
		return acheteurDao.findOne(id);
	}

}
