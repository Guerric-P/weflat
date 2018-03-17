package fr.weflat.backend.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Predicate;

import fr.weflat.backend.dao.ZipCodeDao;
import fr.weflat.backend.domaine.QZipCode;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.ZipCodeService;

@Service
@Transactional
public class ZipCodeServiceImpl implements ZipCodeService {
	@Autowired
	private ZipCodeDao zipCodeDao;
	
	public ZipCode findById(long id) {
		return zipCodeDao.findOne(id);
	}

	@Override
	public ZipCode getById(Long id) {
		return zipCodeDao.findOne(id);
	}

	@Override
	public ZipCode getByCode(String code) {
		return zipCodeDao.findByNumber(code);
	}

	@Override
	public ZipCode save(ZipCode zipCode) {
		return zipCodeDao.save(zipCode);
	}

	@Override
	public Set<ZipCode> getZipCodesByNumbers(Set<String> numbers) {
		QZipCode zipCode = QZipCode.zipCode;
		
		Predicate predicate = zipCode.number.in(numbers);
		
		Set<ZipCode> zipCodes = new HashSet<ZipCode>();
		
		Iterable<ZipCode> result = zipCodeDao.findAll(predicate);
		
		for(ZipCode row : result) {
			zipCodes.add(row);
		}

		
		for(String number : numbers) {
			if(!zipCodes.stream().anyMatch(x -> x.getNumber().equals(number))) {
				zipCodes.add(new ZipCode(number, false));
			}
		}
		

		return zipCodes;
	}
}
