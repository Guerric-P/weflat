package fr.weflat.backend.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.weflat.backend.dao.ArchitecteDao;
import fr.weflat.backend.dao.UtilisateurDao;
import fr.weflat.backend.dao.ZipCodeDao;
import fr.weflat.backend.domaine.Architecte;
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
		return architecteDao.findById(id);
	}

	@Override
	public void save(Architecte architecte) {
		architecteDao.save(architecte);
	}

	@Override
	public void saveZipCodesForArchitecte(List<String> zipCodes, long id) {
		Architecte architecte = getById(id);
		
		//Ajout des nouveaux codes
		for(String zipCode : zipCodes) {
			if(!architecte.getZipCodes().stream().anyMatch(x -> x.getNumber().equals(zipCode))) {
				ZipCode existingZipCode = zipCodeDao.findByNumber(zipCode);
				if(null != existingZipCode) {
					architecte.getZipCodes().add(existingZipCode);
				}
				else {
					architecte.getZipCodes().add(new ZipCode(zipCode));
				}
				
			}
		}
		
		//Suppression des anciens codes
		for(ZipCode zipCode : architecte.getZipCodes()) {
			if(!zipCodes.contains(zipCode.getNumber())){
				architecte.getZipCodes().remove(zipCode);
			}
		}
		
		save(architecte);
		
	}

}
