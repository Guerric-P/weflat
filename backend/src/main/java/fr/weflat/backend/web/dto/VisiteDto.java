package fr.weflat.backend.web.dto;

import java.util.Date;

public class VisiteDto {

	public VisiteDto() {
		
	}
	
	private Long id;
	private AcheteurDto acheteur;
	private ArchitecteDto architecte;
	private ZipCodeDto zipCode;
	private String city;
	private String route;
	private String streetNumber;
	private Date visiteDate;
	private Date creationDate;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public AcheteurDto getAcheteur() {
		return acheteur;
	}

	public void setAcheteur(AcheteurDto acheteur) {
		this.acheteur = acheteur;
	}

	public ArchitecteDto getArchitecte() {
		return architecte;
	}

	public void setArchitecte(ArchitecteDto architecte) {
		this.architecte = architecte;
	}

	public ZipCodeDto getZipCode() {
		return zipCode;
	}

	public void setZipCode(ZipCodeDto zipCode) {
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

	public Date getVisiteDate() {
		return visiteDate;
	}

	public void setVisiteDate(Date visiteDate) {
		this.visiteDate = visiteDate;
	}

	
}
