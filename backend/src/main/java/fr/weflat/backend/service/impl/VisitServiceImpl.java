package fr.weflat.backend.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.BinaryOperator;
import java.util.stream.StreamSupport;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.base.Preconditions;
import com.querydsl.core.types.Predicate;
import com.stripe.Stripe;
import com.stripe.model.Charge;

import fr.weflat.backend.dao.ArchitectDao;
import fr.weflat.backend.dao.VisitDao;
import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.Customer;
import fr.weflat.backend.domaine.QVisit;
import fr.weflat.backend.domaine.Visit;
import fr.weflat.backend.enums.VisitStatusEnum;
import fr.weflat.backend.service.ArchitectService;
import fr.weflat.backend.service.CustomerService;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.VisitService;
import fr.weflat.backend.service.ZipCodeService;
import ma.glasnost.orika.MapperFacade;

@Service
@Transactional
public class VisitServiceImpl implements VisitService {
	@Autowired
	private VisitDao visiteDao;

	@Autowired
	private ArchitectDao architecteDao;

	@Autowired
	private MailService mailService;

	@Autowired
	ArchitectService architecteService;

	@Autowired
	CustomerService acheteurService;

	@Autowired
	ZipCodeService zipCodeService;

	@Autowired
	MapperFacade orikaMapperFacade;

	@PersistenceContext
	private EntityManager em;

	@Value("${fr.weflat.stripe.price}")
	Long visitPrice;

	@Value("${fr.weflat.stripe.partial-refund}")
	Long partialRefundAmount;
	
	@Value("${fr.weflat.architect-remuneration}")
	Long architectRemuneration;

	public VisitServiceImpl(@Value("${fr.weflat.stripe.private-key}") String apiKey) {
		super();
		Stripe.apiKey = apiKey;
	}

	@Override
	public Long save(Visit visit) {
		return visiteDao.save(visit).getId();
	}

	@Override
	public void accept(Long visitId, Long architectId) throws Exception {
		Visit visit = visiteDao.findOne(visitId);
		Architect architect = architecteDao.findOne(architectId);

		if(visit.getNearbyArchitects().stream().anyMatch(x -> x.getId().equals(architectId))) {
			if(visit.getArchitect() == null) {
				visit.setArchitect(architect);
				visit.setNearbyArchitects(null);
				visit.setStatus(VisitStatusEnum.IN_PROGRESS.ordinal());
				visiteDao.save(visit);

				StringBuilder messageBuilder = new StringBuilder();
				messageBuilder.append(architect.getFirstName());
				messageBuilder.append(" ");
				messageBuilder.append(architect.getLastName());
				messageBuilder.append(" a accepté de vous accompagner lors de votre visite du ");
				messageBuilder.append(visit.getVisiteDate());
				messageBuilder.append(" au ");
				messageBuilder.append(visit.getStreetNumber());
				messageBuilder.append(", ");
				messageBuilder.append(visit.getRoute());
				messageBuilder.append(" - ");
				messageBuilder.append(visit.getZipCode().getNumber());
				messageBuilder.append(" ");
				messageBuilder.append(visit.getCity());

				mailService.sendSimpleMail(visit.getCustomer().getEmail(),
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
	public void refuse(Long visitId, Long architectId) throws Exception  {
		Architect architecte = architecteDao.findOne(architectId);

		architecte.getPotentialVisits().removeIf(x -> x.getId().equals(visitId));

		architecteDao.save(architecte);
	}

	@Override
	public Set<Visit> findAvailableVisitsByArchitectId(Long architectId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.nearbyArchitects.any().id.eq(architectId)
				.and(visit.visiteDate.after(new Date()));

		Set<Visit> visits = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll(predicate);

		for(Visit row : result) {
			visits.add(row);
		}

		return visits;
	}

	@Override
	public Set<Visit> findPlannedVisitsByArchitectId(Long architectId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.architect.id.eq(architectId)
				.and(visit.status.eq(VisitStatusEnum.IN_PROGRESS.ordinal()))
				.and(visit.visiteDate.after(new Date()));

		Set<Visit> visits = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll(predicate);

		for(Visit row : result) {
			visits.add(row);
		}

		return visits;
	}

	@Override
	public Set<Visit> findReportPendingVisitsByArchitectId(Long architectId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.architect.id.eq(architectId)
				.and(visit.status.eq(VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal())
						.or(visit.status.eq(VisitStatusEnum.IN_PROGRESS.ordinal()))
						.and(visit.visiteDate.before(new Date())));

		Set<Visit> visites = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll(predicate);

		for(Visit row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Set<Visit> findReportWrittenVisitsByArchitectId(Long architectId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.architect.id.eq(architectId)
				.and(visit.status.eq(VisitStatusEnum.REPORT_AVAILABLE.ordinal())
						.or(visit.status.eq(VisitStatusEnum.ARCHITECT_PAID.ordinal())));

		Set<Visit> visites = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll(predicate);

		for(Visit row : result) {
			visites.add(row);
		}

		return visites;
	}

	@Override
	public Visit findById(Long id) {
		return visiteDao.findOne(id);
	}

	@Override
	public Visit createVisit(Visit visit, Long customerId) throws Exception {

		Customer customer = null;

		if(customerId != null) {
			customer = acheteurService.findById(customerId);
		}

		visit.setCustomer(customer);

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
		return visit;
	}

	@Override
	public Visit pay(Visit visit, String token) throws Exception {

		Preconditions.checkNotNull(token);

		Charge charge = null;

		try {

			Map<String, Object> params = new HashMap<String, Object>();
			params.put("amount", visitPrice);
			params.put("currency", "eur");
			params.put("description", "Paiement acheteur");
			params.put("source", token);
			params.put("capture", false);

			charge = Charge.create(params);

			Set<Architect> nearbyArchitects = architecteService.findNearbyArchitectes(visit.getZipCode().getNumber());

			visit.setNearbyArchitects(nearbyArchitects);

			visit.setStatus(VisitStatusEnum.BEING_ASSIGNED.ordinal());

			visit.setChargeId(charge.getId());
			
			visit.setCustomerPaidAmount(visitPrice);

			save(visit);

		}
		catch(Exception e) {
			if(charge != null) {
				charge.refund();
			}
			throw e;
		}

		charge.capture();
		return visit;
	}

	@Override
	public Visit completeVisitCreation(Visit visit, Long customerId) throws Exception {

		Customer customer = null;

		if(customerId != null) {
			customer = acheteurService.findById(customerId);
		}

		visit.setCustomer(customer);

		if(visit.getZipCode() == null) {
			throw new Exception("No architects are available for zip code : " + visit.getZipCode().getNumber());
		}

		if(isVisitComplete(visit) && visit.getZipCode().isActive()) {
			visit.setStatus(VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal());
		}

		save(visit);
		return visit;

	}

	@Override
	public boolean isVisitComplete(Visit visit) {
		return visit.getCity() != null
				&& visit.getZipCode() != null
				&& visit.getRoute() != null
				&& visit.getVisiteDate() != null
				&& visit.getCustomer() != null;
	}

	@Override
	public Set<Visit> findWaitingForPaymentVisitsByAcheteurId(Long customerId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.customer.id.eq(customerId)
				.and(visit.status.eq(VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal()));

		Set<Visit> visits = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll(predicate);

		for(Visit row : result) {
			visits.add(row);
		}

		return visits;
	}

	@Override
	public Set<Visit> findBeingAssignedVisitsByAcheteurId(Long customerId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.customer.id.eq(customerId)
				.and(visit.status.eq(VisitStatusEnum.BEING_ASSIGNED.ordinal()));

		Set<Visit> visits = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll(predicate);

		for(Visit row : result) {
			visits.add(row);
		}

		return visits;
	}

	@Override
	public Set<Visit> findInProgressVisitsByAcheteurId(Long customerId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.customer.id.eq(customerId)
				.and(visit.status.eq(VisitStatusEnum.IN_PROGRESS.ordinal()))
				.and(visit.visiteDate.before(new Date()));;

				Set<Visit> visits = new HashSet<Visit>();

				Iterable<Visit> result = visiteDao.findAll(predicate);

				for(Visit row : result) {
					visits.add(row);
				}

				return visits;
	}

	@Override
	public Set<Visit> findReportBeingWrittenVisitsByAcheteurId(Long customerId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.customer.id.eq(customerId)
				.and(visit.status.eq(VisitStatusEnum.REPORT_BEING_WRITTEN.ordinal()));

		Set<Visit> visits = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll(predicate);

		for(Visit row : result) {
			visits.add(row);
		}

		return visits;
	}

	@Override
	public Set<Visit> findReportWrittenVisitsByAcheteurId(Long customerId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.customer.id.eq(customerId)
				.and(visit.status.eq(VisitStatusEnum.REPORT_AVAILABLE.ordinal())
						.or(visit.status.eq(VisitStatusEnum.ARCHITECT_PAID.ordinal())));

		Set<Visit> visits = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll(predicate);

		for(Visit row : result) {
			visits.add(row);
		}

		return visits;
	}

	@Override
	public Set<Visit> findPlannedVisitsByAcheteurId(Long customerId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.customer.id.eq(customerId)
				.and(visit.status.eq(VisitStatusEnum.IN_PROGRESS.ordinal()))
				.and(visit.visiteDate.after(new Date()));

		Set<Visit> visits = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll(predicate);

		for(Visit row : result) {
			visits.add(row);
		}

		return visits;
	}

	@Override
	public Visit cancel(Visit visit) throws Exception {
		if(visit.getChargeId() != null) {
			if (visit.getStatus() == VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal()
					|| visit.getStatus() == VisitStatusEnum.UNASSIGNED.ordinal()
					|| visit.getStatus() == VisitStatusEnum.BEING_ASSIGNED.ordinal())
			{
				refund(visit);
			}
			else if (visit.getStatus() == VisitStatusEnum.IN_PROGRESS.ordinal()) {
				partialRefund(visit);
			}

			visit.setStatus(VisitStatusEnum.REFUNDED.ordinal());
		} else {
			visit.setStatus(VisitStatusEnum.CANCELED.ordinal());
		}
		visit.setNearbyArchitects(null);
		save(visit);
		return visit;
	}

	@Override
	public void refund(Visit visit) throws Exception {
		Charge charge = Charge.retrieve(visit.getChargeId());
		visit.setRefundedAmount(charge.getAmount());
		save(visit);
		charge.refund();
	}

	@Override
	public void partialRefund(Visit visit) throws Exception {
		Charge charge = Charge.retrieve(visit.getChargeId());
		visit.setRefundedAmount(partialRefundAmount);
		save(visit);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("amount", partialRefundAmount);
		charge.refund(params);
	}

	@Override
	public Set<Visit> findAll() {
		Set<Visit> visits = new HashSet<Visit>();

		Iterable<Visit> result = visiteDao.findAll();

		for(Visit row : result) {
			visits.add(row);
		}

		return visits;
	}

	@Override
	@PreAuthorize("hasAuthority('admin')")
	public Visit changeStatusToArchitectWasPaid(Visit visit) throws Exception {
		visit.setStatus(VisitStatusEnum.ARCHITECT_PAID.ordinal());
		visit.setArchitectPaidAmount(architectRemuneration);
		save(visit);
		return visit;
	}

	@Override
	@PreAuthorize("hasAnyAuthority(['admin','customer'])")
	public Visit modifyVisit(Visit visit) throws Exception {

		if(visit.getStatus() != VisitStatusEnum.UNASSIGNED.ordinal() 
				&& (visit.getZipCode() == null || !visit.getZipCode().isActive())) {
			throw new Exception("No architects are available for zip code : " + visit.getZipCode().getNumber());
		}

		if(visit.getStatus() == VisitStatusEnum.UNASSIGNED.ordinal()
				|| visit.getStatus() == VisitStatusEnum.BEING_ASSIGNED.ordinal()
				|| visit.getStatus() == VisitStatusEnum.WAITING_FOR_PAYMENT.ordinal())
		{
			em.detach(visit);
			Visit existingVisit = findById(visit.getId());
			Hibernate.initialize(existingVisit.getNearbyArchitects());
			if(!existingVisit.getZipCode().getId().equals(visit.getZipCode().getId())
					|| !existingVisit.getCity().equals(visit.getCity())
					|| existingVisit.getVisiteDate().compareTo(visit.getVisiteDate()) != 0) {

				if(existingVisit.getZipCode().getId() != visit.getZipCode().getId()) {
					Set<Architect> nearbyArchitects = architecteService.findNearbyArchitectes(visit.getZipCode().getNumber());
					visit.setNearbyArchitects(nearbyArchitects);
				}

				//Save as new visit to invalidate any action attempted on previous state
				visit.setId(null);
				em.persist(visit);
				save(visit);	
				delete(existingVisit);

			}
			else {
				em.merge(visit);
				save(visit);
			}

			return visit;
		}
		else {
			throw new Exception("Visit not alterable");
		}
	}

	@Override
	public void delete(Visit visite) {
		visiteDao.delete(visite);
	}

	@Override
	public void delete(Long id) {
		visiteDao.delete(id);

	}

	@Override
	public Long getVisitPrice() {
		return visitPrice;
	}

	@Override
	public Long getVisitPartialRefundAmount() {
		return partialRefundAmount;
	}

	@Override
	public Long getAmountEarned(Long architectId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.architect.id.eq(architectId);
		
		Iterable<Visit> visits = visiteDao.findAll(predicate);
		
		return StreamSupport.stream(visits.spliterator(), false).mapToLong(x -> x.getArchitectPaidAmount() == null ? 0 : x.getArchitectPaidAmount()).sum();
	}

	@Override
	public Long getDoneVisitsCount(Long architectId) {
		QVisit visit = QVisit.visit;

		Predicate predicate = visit.architect.id.eq(architectId)
				.and(visit.status.in(
						VisitStatusEnum.ARCHITECT_PAID.ordinal(),
						VisitStatusEnum.REPORT_AVAILABLE.ordinal()
						)
						);
		
		Iterable<Visit> visits = visiteDao.findAll(predicate);
		
		return StreamSupport.stream(visits.spliterator(), false).count();
	}
}
