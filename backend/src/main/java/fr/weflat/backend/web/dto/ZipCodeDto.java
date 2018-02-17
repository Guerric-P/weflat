package fr.weflat.backend.web.dto;

public class ZipCodeDto {
	private Long id;
	private String number;
	private boolean active;
	
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
	
}
