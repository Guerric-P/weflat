package fr.weflat.backend.domaine;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "visit")
public class Visit {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "visit_id_seq", sequenceName = "visit_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "visit_id_seq")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "architect_id", nullable = true)
	private Architect architect;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id", nullable = false)
	private Customer customer;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "report_id")
	private Report report;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "zip_code_id", nullable = false)
	private ZipCode zipCode;
	
	@Column(nullable = true, name = "city")
	private String city;
	
	@Column(nullable = true, name = "route")
	private String route;
	
	@Column(nullable = true, name = "street_number")
	private String streetNumber;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "architect_visit", joinColumns = @JoinColumn(name = "visit_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "architect_id", referencedColumnName = "id"))
	private Set<Architect> nearbyArchitects;
	
	@Column(nullable = false, name = "creation_date")
	private Date creationDate;
	
	@Column(nullable = false, name = "visit_date")
	private Date visiteDate;
	
	@Column(nullable = false, name = "status")
	private int status;
	
	@Column(nullable = true, name = "announcement_url")
	private String announcementUrl;
	
	@Column(nullable = true, name = "charge_id")
	private String chargeId;
	
	public String getChargeId() {
		return chargeId;
	}

	public void setChargeId(String idCharge) {
		this.chargeId = idCharge;
	}

	public Architect getArchitect() {
		return architect;
	}

	public Date getVisiteDate() {
		return visiteDate;
	}

	public void setVisiteDate(Date visiteDate) {
		this.visiteDate = visiteDate;
	}

	public void setArchitect(Architect architecte) {
		this.architect = architecte;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public ZipCode getZipCode() {
		return zipCode;
	}

	public void setZipCode(ZipCode zipCode) {
		this.zipCode = zipCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Report getReport() {
		return report;
	}

	public void setReport(Report report) {
		this.report = report;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	public Set<Architect> getNearbyArchitects() {
		return nearbyArchitects;
	}

	public void setNearbyArchitects(Set<Architect> nearbyArchitectes) {
		this.nearbyArchitects = nearbyArchitectes;
	}

	public String getAnnouncementUrl() {
		return announcementUrl;
	}

	public void setAnnouncementUrl(String announcementUrl) {
		this.announcementUrl = announcementUrl;
	}
	
	public String formattedAddress() {
		if(streetNumber != null) {
			return streetNumber + ", " + route + " - " + zipCode.getNumber() + " " + city;
		}
		else {
			return route + " - " + zipCode.getNumber() + " " + city;
		}
	}
}
