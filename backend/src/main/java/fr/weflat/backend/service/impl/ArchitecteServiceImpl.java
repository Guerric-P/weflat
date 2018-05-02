package fr.weflat.backend.service.impl;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.Predicate;

import fr.weflat.backend.dao.ArchitecteDao;
import fr.weflat.backend.dao.ZipCodeDao;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.QArchitecte;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.enums.ArchitectStatusEnum;
import fr.weflat.backend.service.ArchitecteService;

@Service
@Transactional
public class ArchitecteServiceImpl implements ArchitecteService {

	@Autowired
	private ArchitecteDao architecteDao;

	@Autowired
	private ZipCodeDao zipCodeDao;

	@Override
	public Architecte findById(long id) {
		return architecteDao.findOne(id);
	}

	@Override
	public Architecte save(Architecte architect) {
		if(isProfileComplete(architect) && architect.getStatus() == ArchitectStatusEnum.CREATED.ordinal()) {
			architect.setStatus(ArchitectStatusEnum.APPROVING.ordinal());
		}
		if(!isProfileComplete(architect) && architect.getStatus() == ArchitectStatusEnum.APPROVING.ordinal()) {
			architect.setStatus(ArchitectStatusEnum.CREATED.ordinal());
		}
		return architecteDao.save(architect);
	}

	@Override
	public void saveZipCodesForArchitecte(List<ZipCode> zipCodes, long id) {
		Architecte architecte = findById(id);

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

		Predicate predicate = architecte.zipCodes.contains(zipCode)
				.and(architecte.status.eq(ArchitectStatusEnum.VALIDATED.ordinal()));

		Set<Architecte> architectes = new HashSet<Architecte>();

		Iterable<Architecte> result = architecteDao.findAll(predicate);

		for(Architecte row : result) {
			architectes.add(row);
		}

		return architectes;
	}

	@Override
	public Set<Architecte> findAll() {

		Set<Architecte> architectes = new HashSet<Architecte>();

		Iterable<Architecte> result = architecteDao.findAll();

		for(Architecte row : result) {
			architectes.add(row);
		}

		return architectes;
	}

	@Override
	public boolean isProfileComplete(Architecte architect) {
		return architect.getBirthDate() != null
				&& architect.getEmail() != null
				&& architect.getFirstName() != null
				&& architect.getLastName() != null
				&& architect.getMotivation() != null
				&& architect.getPaymentType() != null
				&& architect.getPracticingSince() != null
				&& architect.getSituation() != null
				&& architect.getTelephone() != null
				&& architect.getType() != null
				&& architect.getWebSite() != null
				&& architect.getZipCodes() != null
				&& architect.getZipCodes().size() != 0;
	}

	@Override
	@PreAuthorize("hasAuthority('admin')")
	public void accept(long id) throws Exception {
		Architecte architect = findById(id);
		
		if(architect.getStatus() == ArchitectStatusEnum.APPROVING.ordinal()) {
			architect.setStatus(ArchitectStatusEnum.VALIDATED.ordinal());
			save(architect);
		}
		else {
			throw new Exception("Architect is not in pending state.");
		}
	}

	@Override
	@PreAuthorize("hasAuthority('admin')")
	public void refuse(long id) throws Exception {
		Architecte architect = findById(id);

		if(architect.getStatus() == ArchitectStatusEnum.APPROVING.ordinal()) {
			architect.setStatus(ArchitectStatusEnum.REFUSED.ordinal());
			save(architect);
		}
		else {
			throw new Exception("Architect is not in pending state.");
		}
		
	}

}
