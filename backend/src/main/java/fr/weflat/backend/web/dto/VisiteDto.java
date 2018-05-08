package fr.weflat.backend.web.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

public class VisiteDto {

	public VisiteDto() {
		
	}
	
	private Long id;
	private CustomerDto customer;
	private ArchitectDto architect;
	private ZipCodeDto zipCode;
	private String city;
	private String route;
	private String streetNumber;
	private Date visiteDate;
	
	@JsonProperty(access = Access.READ_ONLY)
	private Date creationDate;
	
	@JsonProperty(access = Access.READ_ONLY)
	private int status;
	private String announcementUrl;
	
	@JsonProperty(access = Access.READ_ONLY)
	private String chargeId;

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

	public CustomerDto getCustomer() {
		return customer;
	}

	public void setCustomer(CustomerDto acheteur) {
		this.customer = acheteur;
	}

	public ArchitectDto getArchitect() {
		return architect;
	}

	public void setArchitect(ArchitectDto architecte) {
		this.architect = architecte;
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

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getAnnouncementUrl() {
		return announcementUrl;
	}

	public void setAnnouncementUrl(String announcementUrl) {
		this.announcementUrl = announcementUrl;
	}
	
	public String getChargeId() {
		return chargeId;
	}

	public void setChargeId(String chargeId) {
		this.chargeId = chargeId;
	}
}
