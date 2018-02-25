package fr.weflat.backend.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.base.Preconditions;
import com.querydsl.core.types.Predicate;
import com.stripe.Stripe;
import com.stripe.model.Charge;

import fr.weflat.backend.dao.ArchitecteDao;
import fr.weflat.backend.dao.VisiteDao;
import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.QVisite;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.enums.VisitStatusEnum;
import fr.weflat.backend.service.AcheteurService;
import fr.weflat.backend.service.ArchitecteService;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.VisiteService;
import fr.weflat.backend.service.ZipCodeService;
import ma.glasnost.orika.MapperFacade;

@Service
@Transactional
public class VisiteServiceImpl implements VisiteService {
	@Autowired
	private VisiteDao visiteDao;

	@Autowired
	private ArchitecteDao architecteDao;

	@Autowired
	private MailService mailService;

	@Autowired
	ArchitecteService architecteService;

	@Autowired
	AcheteurService acheteurService;

	@Autowired
	ZipCodeService zipCodeService;

	@Autowired
	MapperFacade orikaMapperFacade;

	@Override
	public Long save(Visite visite) {
		return visiteDao.save(visite).getId();
	}

	@Override
	public void accept(Long idVisite, Long idArchitecte) throws Exception {
		Visite visite = visiteDao.findOne(idVisite);
		Architecte architecte = architecteDao.findOne(idArchitecte);

		if(visite.getNearbyArchitectes().stream().anyMatch(x -> x.getId().equals(idArchitecte))) {
			if(visite.getArchitecte() == null) {
				visite.setArchitecte(architecte);
				visite.setNearbyArchitectes(null);
				visite.setStatus(VisitStatusEnum.IN_PROGRESS.ordinal());
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
	public Set<Visite> findAvailableVisitsByArchitectId(Long idArchitecte) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.nearbyArchitectes.any().id.eq(idArchitecte)
				.and(visite.visiteDate.after(new Date()));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Set<Visite> findPlannedVisitsByArchitectId(Long idArchitecte) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.architecte.id.eq(idArchitecte)
				.and(visite.status.eq(VisitStatusEnum.IN_PROGRESS.ordinal()))
				.and(visite.visiteDate.after(new Date()));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Set<Visite> findReportPendingVisitsByArchitectId(Long idArchitecte) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.architecte.id.eq(idArchitecte)
				.and(visite.status.eq(VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal())
						.or(visite.status.eq(VisitStatusEnum.IN_PROGRESS.ordinal()))
						.and(visite.visiteDate.before(new Date())));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Set<Visite> findReportWrittenVisitsByArchitectId(Long idArchitecte) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.architecte.id.eq(idArchitecte)
				.and(visite.status.eq(VisitStatusEnum.REPORT_AVAILABLE.ordinal()));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Visite getById(Long id) {
		return visiteDao.findOne(id);
	}

	@Override
	public void createVisit(Visite visit, Long idAcheteur) throws Exception {

		Acheteur acheteur = null;

		if(idAcheteur != null) {
			acheteur = acheteurService.findById(idAcheteur);
		}
		
		visit.setAcheteur(acheteur);

		if(visit.getZipCode() != null && visit.getZipCode().isActive()) {
			if(isVisitComplete(visit)) {
				visit.setStatus(VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal());
			}
			else {
				visit.setStatus(VisitStatusEnum.UNASSIGNED.ordinal());
			}
		}
		else {
			visit.setStatus(VisitStatusEnum.UNASSIGNED.ordinal());
		}

		visit.setCreationDate(new Date());

		save(visit);
	}

	@Override
	public void pay(Visite visit, String token) throws Exception {

		Preconditions.checkNotNull(token);

		Charge charge = null;

		try {
			Stripe.apiKey = "sk_test_ex3BOWKtQexdJh4zKFOTo36m";

			Map<String, Object> params = new HashMap<String, Object>();
			params.put("amount", 15000);
			params.put("currency", "eur");
			params.put("description", "Paiement acheteur");
			params.put("source", token);
			params.put("capture", false);

			charge = Charge.create(params);

			Set<Architecte> nearbyArchitectes = architecteService.findNearbyArchitectes(visit.getZipCode().getNumber());

			visit.setNearbyArchitectes(nearbyArchitectes);
			
			visit.setStatus(VisitStatusEnum.BEING_ASSIGNED.ordinal());
			
			save(visit);
		}
		catch(Exception e) {
			if(charge != null) {
				charge.refund();
			}
			throw e;
		}

		charge.capture();
	}

	@Override
	public void completeVisitCreation(Visite visit, Long idAcheteur) throws Exception {

		Acheteur acheteur = null;

		if(idAcheteur != null) {
			acheteur = acheteurService.findById(idAcheteur);
		}
		
		visit.setAcheteur(acheteur);

		if(visit.getZipCode() == null) {
			throw new Exception("No architects are available for zip code : " + visit.getZipCode().getNumber());
		}
		
		if(isVisitComplete(visit) && visit.getZipCode().isActive()) {
			visit.setStatus(VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal());
		}

		save(visit);

	}

	@Override
	public boolean isVisitComplete(Visite visit) {
		return visit.getCity() != null
				&& visit.getStreetNumber() != null
				&& visit.getRoute() != null
				&& visit.getAnnouncementUrl() != null
				&& visit.getAcheteur() != null;
	}

	@Override
	public Set<Visite> findWaitingForPaymentVisitsByAcheteurId(Long idAcheteur) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.acheteur.id.eq(idAcheteur)
				.and(visite.status.eq(VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal()));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Set<Visite> findBeingAssignedVisitsByAcheteurId(Long idAcheteur) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.acheteur.id.eq(idAcheteur)
				.and(visite.status.eq(VisitStatusEnum.BEING_ASSIGNED.ordinal()));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Set<Visite> findInProgressVisitsByAcheteurId(Long idAcheteur) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.acheteur.id.eq(idAcheteur)
				.and(visite.status.eq(VisitStatusEnum.IN_PROGRESS.ordinal()));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Set<Visite> findReportBeingWrittenVisitsByAcheteurId(Long idAcheteur) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.acheteur.id.eq(idAcheteur)
				.and(visite.status.eq(VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal())
						.or(visite.status.eq(VisitStatusEnum.IN_PROGRESS.ordinal()))
						.and(visite.visiteDate.before(new Date())));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Set<Visite> findReportWrittenVisitsByAcheteurId(Long idAcheteur) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.acheteur.id.eq(idAcheteur)
				.and(visite.status.eq(VisitStatusEnum.REPORT_AVAILABLE.ordinal()));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Set<Visite> findPlannedVisitsByAcheteurId(Long idAcheteur) {
		QVisite visite = QVisite.visite;

		Predicate predicate = visite.acheteur.id.eq(idAcheteur)
				.and(visite.status.eq(VisitStatusEnum.IN_PROGRESS.ordinal()))
				.and(visite.visiteDate.after(new Date()));

		Set<Visite> visites = new HashSet<Visite>();

		Iterable<Visite> result = visiteDao.findAll(predicate);

		for(Visite row : result) {
			visites.add(row);
		}

		return visites;
	}
}
