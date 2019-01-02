package fr.weflat.backend.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.ArchitectTypeDao;
import fr.weflat.backend.domaine.ArchitectType;
import fr.weflat.backend.service.ArchitectTypeService;

@Service
@Transactional
public class ArchitectTypeServiceImpl implements ArchitectTypeService {
	
	@Autowired
	private ArchitectTypeDao architectTypeDao;

	@Override
	@Transactional(readOnly=true)
	public Set<ArchitectType> findAll() {
		Set<ArchitectType> architectTypes = new HashSet<ArchitectType>();
		
		Iterable<ArchitectType> result = architectTypeDao.findAll();
		
		for(ArchitectType row : result) {
			architectTypes.add(row);
		}
		
		return architectTypes;
	}

}
