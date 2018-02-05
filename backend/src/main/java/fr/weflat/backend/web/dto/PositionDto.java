package fr.weflat.backend.web.dto;

public class PositionDto {
	private Long id;
    private String label;
    private boolean mandatory;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public boolean isMandatory() {
		return mandatory;
	}
	public void setMandatory(boolean mandatory) {
		this.mandatory = mandatory;
	}
}
