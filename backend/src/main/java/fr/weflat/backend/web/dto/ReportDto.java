package fr.weflat.backend.web.dto;

import java.util.HashSet;
import java.util.Set;

public class ReportDto {
	private Long id;
	private Set<RenovationDto> renovations = new HashSet<RenovationDto>();
	private Long floor;
	private String generalRemarks;
	private String orientation;
	private Long rooms;
	private Long surface;
	private VisiteDto visite;
	private String expectations;
	private String globalQualityRemarks;
	private Long globalCondition;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<RenovationDto> getRenovations() {
		return renovations;
	}

	public void setRenovations(Set<RenovationDto> renovations) {
		this.renovations = renovations;
	}

	public Long getFloor() {
		return floor;
	}

	public void setFloor(Long floor) {
		this.floor = floor;
	}

	public String getGeneralRemarks() {
		return generalRemarks;
	}

	public void setGeneralRemarks(String generalRemarks) {
		this.generalRemarks = generalRemarks;
	}

	public String getOrientation() {
		return orientation;
	}

	public void setOrientation(String orientation) {
		this.orientation = orientation;
	}

	public Long getRooms() {
		return rooms;
	}

	public void setRooms(Long rooms) {
		this.rooms = rooms;
	}

	public Long getSurface() {
		return surface;
	}

	public void setSurface(Long surface) {
		this.surface = surface;
	}

	public VisiteDto getVisite() {
		return visite;
	}

	public void setVisite(VisiteDto visite) {
		this.visite = visite;
	}

	public String getExpectations() {
		return expectations;
	}

	public void setExpectations(String expectations) {
		this.expectations = expectations;
	}

	public String getGlobalQualityRemarks() {
		return globalQualityRemarks;
	}

	public void setGlobalQualityRemarks(String globalQualityRemarks) {
		this.globalQualityRemarks = globalQualityRemarks;
	}

	public Long getGlobalCondition() {
		return globalCondition;
	}

	public void setGlobalCondition(Long globalCondition) {
		this.globalCondition = globalCondition;
	}
}
