package fr.weflat.backend.web.dto;

public class ZipCodeDto {
	private Long id;
	private String number;
	private boolean active;
	private String county;
	private String town;
	
	public ZipCodeDto() {
	}
	
	public ZipCodeDto(String number) {
		this.number = number;
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
	public void setNumber(String number) {
		this.number = number;
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
}
