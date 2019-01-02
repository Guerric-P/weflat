package fr.weflat.backend.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.PositionDao;
import fr.weflat.backend.domaine.Position;
import fr.weflat.backend.service.PositionService;

@Service
@Transactional
public class PositionServiceImpl implements PositionService {
	@Autowired
	private PositionDao positionDao;
	
	@Override
	@Transactional(readOnly=true)
	public Set<Position> findAll() {
		Set<Position> positions = new HashSet<Position>();
		
		Iterable<Position> result = positionDao.findAll();
		
		for(Position row : result) {
			positions.add(row);
		}
		
		return positions;
	}
}
