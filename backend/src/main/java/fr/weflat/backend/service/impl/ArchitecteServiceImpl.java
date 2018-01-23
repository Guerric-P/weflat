package fr.weflat.backend.service.impl;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.Predicate;

import fr.weflat.backend.dao.ArchitecteDao;
import fr.weflat.backend.dao.ZipCodeDao;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.QArchitecte;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.ArchitecteService;

@Service
@Transactional
public class ArchitecteServiceImpl implements ArchitecteService {
	
	@Autowired
	private ArchitecteDao architecteDao;

	@Autowired
	private ZipCodeDao zipCodeDao;

	@Override
	public Architecte getById(long id) {
		return architecteDao.findOne(id);
	}

	@Override
	public void save(Architecte architecte) {
		architecteDao.save(architecte);
	}

	@Override
	public void saveZipCodesForArchitecte(List<ZipCode> zipCodes, long id) {
		Architecte architecte = getById(id);

		//Ajout des nouveaux codes
		for(ZipCode zipCode : zipCodes) {
			if(!architecte.getZipCodes().stream().anyMatch(x -> x.getNumber().equals(zipCode.getNumber()))) {
				ZipCode existingZipCode = zipCodeDao.findByNumber(zipCode.getNumber());
				if(null != existingZipCode) {
					architecte.getZipCodes().add(existingZipCode);
				}
				else {
					architecte.getZipCodes().add(zipCode);
				}

			}
		}

		//Suppression des anciens codes
		Iterator<ZipCode> it = architecte.getZipCodes().iterator();  
		while (it.hasNext()) {
			ZipCode zipCode = it.next();

			if(!zipCodes.stream().anyMatch(x -> x.getNumber().equals(zipCode.getNumber()))) {
				it.remove();
			}
		}

		save(architecte);

	}

	@Override
	public Set<Architecte> findNearbyArchitectes(String code) {
		QArchitecte architecte = QArchitecte.architecte;
		
		ZipCode zipCode = zipCodeDao.findByNumber(code);
		
		Predicate predicate = architecte.zipCodes.contains(zipCode);
		
		Set<Architecte> architectes = new HashSet<Architecte>();
	
		Iterable<Architecte> result = architecteDao.findAll(predicate);
		
		for(Architecte row : result) {
			architectes.add(row);
		}
		
		return architectes;
	}

}
