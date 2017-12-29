package fr.weflat.backend.web.dto;

import java.util.Date;

import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.web.dto.base.BaseDto;

public class VisiteDto extends BaseDto<Visite> {

	public VisiteDto() {
		super();
	}

	public VisiteDto(Visite type) {
		super(type);
	}

	@Override
	public void From(Visite type) {
		// TODO Auto-generated method stub
		
	}
	
	private Long id;
	private Long idAcheteur;
	private Long idArchitecte;
	private String zipCode;
	private String city;
	private String route;
	private String streetNumber;
	private Date creationDate;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdAcheteur() {
		return idAcheteur;
	}

	public void setIdAcheteur(Long idAcheteur) {
		this.idAcheteur = idAcheteur;
	}

	public Long getIdArchitecte() {
		return idArchitecte;
	}

	public void setIdArchitecte(Long idArchitecte) {
		this.idArchitecte = idArchitecte;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
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

	
}
