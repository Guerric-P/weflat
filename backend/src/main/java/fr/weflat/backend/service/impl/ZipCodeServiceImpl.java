package fr.weflat.backend.service.impl;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Predicate;

import fr.weflat.backend.dao.ZipCodeDao;
import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.QZipCode;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.ArchitectService;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.ZipCodeService;

@Service
@Transactional
public class ZipCodeServiceImpl implements ZipCodeService {
	@Autowired
	private ZipCodeDao zipCodeDao;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private ArchitectService architectService;

	@Override
	public ZipCode findById(Long id) {
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

	@Override
	public Set<ZipCode> getZipCodesByNumbersStartingWith(String string) {	
		QZipCode zipCode = QZipCode.zipCode;

		Predicate predicate = zipCode.number.startsWith(string);

		Set<ZipCode> zipCodes = new HashSet<ZipCode>();

		Iterable<ZipCode> result = zipCodeDao.findAll(predicate);

		for(ZipCode row : result) {
			zipCodes.add(row);
		}

		return zipCodes;
	}

	@Override
	public void deleteById(long id) {
		zipCodeDao.delete(id);
	}
	
	@Override
	public Set<ZipCode> bulkUpdate(Set<ZipCode> zipCodesToSave) throws Exception {
		Set<ZipCode> zipCodesFromDatabase = getZipCodesByNumbers(zipCodesToSave.stream().map(x -> x.getNumber()).collect(Collectors.toSet()));
		
		Collection<ZipCode> mergedZipCodes = Stream.of(zipCodesFromDatabase, zipCodesToSave)
				.flatMap(Set::stream)
				.collect(Collectors.toMap(ZipCode::getNumber, z -> z, (ZipCode x, ZipCode y) -> {
					if(x.getId() != null) {
						x.setNumber(y.getNumber());
						x.setActive(y.isActive());
						return x;
					} else if (y.getId() != null) {
						y.setNumber(x.getNumber());
						y.setActive(x.isActive());
						return y;
					}
					else {
						return null;
					}
				}))
				.values();
		
		Iterable<ZipCode> result = zipCodeDao.save(mergedZipCodes);
		
		Set<ZipCode> activatedZipCodes = mergedZipCodes.stream().filter(x -> x.isActive() == true).collect(Collectors.toSet());
		
		Set<Architect> architects = architectService.findValidatedArchitectsHavingZipCodes(activatedZipCodes);
		
		mailService.sendZipCodeActivatedMail(architects, mergedZipCodes);

		return StreamSupport.stream(result.spliterator(), false).collect(Collectors.toSet());
	}
}
