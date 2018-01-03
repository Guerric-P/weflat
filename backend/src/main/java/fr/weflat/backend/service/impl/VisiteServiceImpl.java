package fr.weflat.backend.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.Predicate;

import fr.weflat.backend.dao.ArchitecteDao;
import fr.weflat.backend.dao.VisiteDao;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.QArchitecte;
import fr.weflat.backend.domaine.QVisite;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.service.VisiteService;

@Service
public class VisiteServiceImpl implements VisiteService {
	@Autowired
	private VisiteDao visiteDao;
	
	@Autowired
	private ArchitecteDao architecteDao;

	@Override
	public void save(Visite visite) {
		visiteDao.save(visite);
	}

	@Override
	public Set<Visite> findNearbyVisites(Long idArchitecte) {
		
		Architecte architecte = architecteDao.findById(idArchitecte);

		return architecte.getPotentialVisites();
	}
}
