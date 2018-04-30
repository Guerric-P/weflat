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
@Table(name = "visite")
public class Visite {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "visite_id_seq", sequenceName = "visite_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "visite_id_seq")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_architecte", nullable = true)
	private Architecte architecte;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_acheteur", nullable = false)
	private Acheteur acheteur;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_report")
	private Report report;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_zip_code", nullable = false)
	private ZipCode zipCode;
	
	@Column(nullable = true, name = "city")
	private String city;
	
	@Column(nullable = true, name = "route")
	private String route;
	
	@Column(nullable = true, name = "street_number")
	private String streetNumber;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "architecte_visite", joinColumns = @JoinColumn(name = "id_visite", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "id_architecte", referencedColumnName = "id"))
	private Set<Architecte> nearbyArchitectes;
	
	@Column(nullable = false, name = "creation_date")
	private Date creationDate;
	
	@Column(nullable = false, name = "visite_date")
	private Date visiteDate;
	
	@Column(nullable = false, name = "status")
	private int status;
	
	@Column(nullable = true, name = "announcement_url")
	private String announcementUrl;
	
	@Column(nullable = true, name = "id_charge")
	private String idCharge;
	
	public String getIdCharge() {
		return idCharge;
	}

	public void setIdCharge(String idCharge) {
		this.idCharge = idCharge;
	}

	public Architecte getArchitecte() {
		return architecte;
	}

	public Date getVisiteDate() {
		return visiteDate;
	}

	public void setVisiteDate(Date visiteDate) {
		this.visiteDate = visiteDate;
	}

	public void setArchitecte(Architecte architecte) {
		this.architecte = architecte;
	}

	public Acheteur getAcheteur() {
		return acheteur;
	}

	public void setAcheteur(Acheteur acheteur) {
		this.acheteur = acheteur;
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
	public Set<Architecte> getNearbyArchitectes() {
		return nearbyArchitectes;
	}

	public void setNearbyArchitectes(Set<Architecte> nearbyArchitectes) {
		this.nearbyArchitectes = nearbyArchitectes;
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
