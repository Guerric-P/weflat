package fr.weflat.backend.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Predicate;

import fr.weflat.backend.dao.ArchitecteDao;
import fr.weflat.backend.dao.VisiteDao;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.QVisite;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.VisiteService;

@Service
@Transactional
public class VisiteServiceImpl implements VisiteService {
	@Autowired
	private VisiteDao visiteDao;
	
	@Autowired
	private ArchitecteDao architecteDao;
	
	@Autowired
	private MailService mailService;

	@Override
	public void save(Visite visite) {
		visiteDao.save(visite);
	}

	@Override
	public Set<Visite> findNearbyVisites(Long idArchitecte) {
		
		Architecte architecte = architecteDao.findOne(idArchitecte);

		return architecte.getPotentialVisites();
	}

	@Override
	public void accept(Long idVisite, Long idArchitecte) throws Exception {
		Visite visite = visiteDao.findOne(idVisite);
		Architecte architecte = architecteDao.findOne(idArchitecte);
		
		if(visite.getNearbyArchitectes().stream().anyMatch(x -> x.getId().equals(idArchitecte))) {
			if(visite.getArchitecte() == null) {
				visite.setArchitecte(architecte);
				visite.setNearbyArchitectes(null);
				visiteDao.save(visite);
				
				StringBuilder messageBuilder = new StringBuilder();
				messageBuilder.append(architecte.getFirstName());
				messageBuilder.append(" ");
				messageBuilder.append(architecte.getLastName());
				messageBuilder.append(" a accepté de vous accompagner lors de votre visite du ");
				messageBuilder.append(visite.getVisiteDate());
				messageBuilder.append(" au ");
				messageBuilder.append(visite.getStreetNumber());
				messageBuilder.append(", ");
				messageBuilder.append(visite.getRoute());
				messageBuilder.append(" - ");
				messageBuilder.append(visite.getZipCode().getNumber());
				messageBuilder.append(" ");
				messageBuilder.append(visite.getCity());

				mailService.sendSimpleMail(visite.getAcheteur().getEmail(),
						"Un architecte a accepté votre visite !",
						messageBuilder.toString());
			}
			else {
				throw new Exception("Architect is already assigned");
			}
		}
		else {
			throw new Exception("Architect is not allowed to accept this visit");
		}
	}

	@Override
	public void refuse(Long idVisite, Long idArchitecte) throws Exception  {
		Architecte architecte = architecteDao.findOne(idArchitecte);
		
		architecte.getPotentialVisites().removeIf(x -> x.getId().equals(idVisite));
		
		architecteDao.save(architecte);
	}

	@Override
	public Set<Visite> findPlannedVisites(Long idArchitecte) {
		QVisite visite = QVisite.visite;
		
		Predicate predicate = visite.architecte.id.eq(idArchitecte);
				
		Set<Visite> visites = new HashSet<Visite>();
		
		Iterable<Visite> result = visiteDao.findAll(predicate);
		
		for(Visite row : result) {
			visites.add(row);
		}
		
		return visites;
	}
}
