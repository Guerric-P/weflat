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

import fr.weflat.backend.dao.ArchitectDao;
import fr.weflat.backend.dao.ZipCodeDao;
import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.QArchitect;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.enums.ArchitectStatusEnum;
import fr.weflat.backend.service.ArchitectService;

@Service
@Transactional
public class ArchitectServiceImpl implements ArchitectService {

	@Autowired
	private ArchitectDao architectDao;

	@Autowired
	private ZipCodeDao zipCodeDao;

	@Override
	public Architect findById(long id) {
		return architectDao.findOne(id);
	}

	@Override
	public Architect save(Architect architect) {
		if(isProfileComplete(architect) && architect.getStatus() == ArchitectStatusEnum.CREATED.ordinal()) {
			architect.setStatus(ArchitectStatusEnum.APPROVING.ordinal());
		}
		if(!isProfileComplete(architect) && architect.getStatus() == ArchitectStatusEnum.APPROVING.ordinal()) {
			architect.setStatus(ArchitectStatusEnum.CREATED.ordinal());
		}
		return architectDao.save(architect);
	}

	@Override
	public void saveZipCodesForArchitecte(List<ZipCode> zipCodes, long id) {
		Architect architect = findById(id);

		//Ajout des nouveaux codes
		for(ZipCode zipCode : zipCodes) {
			if(!architect.getZipCodes().stream().anyMatch(x -> x.getNumber().equals(zipCode.getNumber()))) {
				ZipCode existingZipCode = zipCodeDao.findByNumber(zipCode.getNumber());
				if(null != existingZipCode) {
					architect.getZipCodes().add(existingZipCode);
				}
				else {
					architect.getZipCodes().add(zipCode);
				}

			}
		}

		//Suppression des anciens codes
		Iterator<ZipCode> it = architect.getZipCodes().iterator();  
		while (it.hasNext()) {
			ZipCode zipCode = it.next();

			if(!zipCodes.stream().anyMatch(x -> x.getNumber().equals(zipCode.getNumber()))) {
				it.remove();
			}
		}

		save(architect);

	}

	@Override
	public Set<Architect> findNearbyArchitectes(String code) {
		QArchitect architect = QArchitect.architect;

		ZipCode zipCode = zipCodeDao.findByNumber(code);

		Predicate predicate = architect.zipCodes.contains(zipCode)
				.and(architect.status.eq(ArchitectStatusEnum.VALIDATED.ordinal()));

		Set<Architect> architects = new HashSet<Architect>();

		Iterable<Architect> result = architectDao.findAll(predicate);

		for(Architect row : result) {
			architects.add(row);
		}

		return architects;
	}

	@Override
	public Set<Architect> findAll() {

		Set<Architect> architects = new HashSet<Architect>();

		Iterable<Architect> result = architectDao.findAll();

		for(Architect row : result) {
			architects.add(row);
		}

		return architects;
	}

	@Override
	public boolean isProfileComplete(Architect architect) {
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
				&& architect.getZipCodes() != null
				&& architect.getZipCodes().size() != 0;
	}

	@Override
	@PreAuthorize("hasAuthority('admin')")
	public void accept(long id) throws Exception {
		Architect architect = findById(id);
		
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
		Architect architect = findById(id);

		if(architect.getStatus() == ArchitectStatusEnum.APPROVING.ordinal()) {
			architect.setStatus(ArchitectStatusEnum.REFUSED.ordinal());
			save(architect);
		}
		else {
			throw new Exception("Architect is not in pending state.");
		}
		
	}

}
