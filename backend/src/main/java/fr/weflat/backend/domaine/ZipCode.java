package fr.weflat.backend.domaine;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "zip_code")
public class ZipCode {
	
	public ZipCode() {
		super();
	}

	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "zip_code_id_seq", sequenceName = "zip_code_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "zip_code_id_seq")
	private Long id;
	
	public ZipCode(String number) {
		super();
		this.number = number;
	}
	
	public ZipCode(String number, boolean active) {
		super();
		this.number = number;
		this.active = active;
	}

	@Column(nullable = false, name = "number", unique = true)
	private String number;
	
	@Column(nullable = false, name = "active", unique = true)
	private boolean active;
	
	@Column(nullable = true, name = "county")
	private String county;
	
	@Column(nullable = true, name = "town")
	private String town;
	
	@ManyToMany(mappedBy = "zipCodes")
	private Set<Architect> architectes;
	
	@Column(nullable = true, name = "longitude")
	private double longitude;
	
	@Column(nullable = true, name = "latitude")
	private double latitude;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "zipCode", orphanRemoval=false)
	private Set<Visit> visites;
	
	public Set<Visit> getVisites() {
		return visites;
	}
	public void setVisites(Set<Visit> visites) {
		this.visites = visites;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String numero) {
		this.number = numero;
	}
	
    public Set<Architect> getArchitectes() {
        return architectes;
    }
	
	public void setArchitectes(Set<Architect> architectes) {
		this.architectes = architectes;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getTown() {
		return town;
	}

	public void setTown(String town) {
		this.town = town;
	}
	
	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	
}
