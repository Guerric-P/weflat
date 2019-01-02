package fr.weflat.backend.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.ArchitectSituationDao;
import fr.weflat.backend.domaine.ArchitectSituation;
import fr.weflat.backend.service.ArchitectSituationService;

@Service
@Transactional
public class ArchitectSituationServiceImpl implements ArchitectSituationService {

	@Autowired
	private ArchitectSituationDao architectSituationDao;
	
	@Override
	@Transactional(readOnly=true)
	public Set<ArchitectSituation> findAll() {
		Set<ArchitectSituation> architectTypes = new HashSet<ArchitectSituation>();
		
		Iterable<ArchitectSituation> result = architectSituationDao.findAll();
		
		for(ArchitectSituation row : result) {
			architectTypes.add(row);
		}
		
		return architectTypes;
	}

}
