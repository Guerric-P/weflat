package fr.weflat.backend.web.dto;

import java.util.Set;

public class ReportDto {
	private Long id;
	private Set<RenovationDto> renovations;
	private int floor;
	private String generalRemarks;
	private String orientation;
	private int rooms;
	private int surface;
	private VisiteDto visite;
	private String expectations;
	private String globalQualityRemarks;
	private int globalCondition;
	
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

	public int getFloor() {
		return floor;
	}

	public void setFloor(int floor) {
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

	public int getRooms() {
		return rooms;
	}

	public void setRooms(int rooms) {
		this.rooms = rooms;
	}

	public int getSurface() {
		return surface;
	}

	public void setSurface(int surface) {
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

	public int getGlobalCondition() {
		return globalCondition;
	}

	public void setGlobalCondition(int globalCondition) {
		this.globalCondition = globalCondition;
	}
}
