package fr.weflat.backend.web.dto;

import java.util.Set;

import fr.weflat.backend.domaine.Renovation;

public class ReportDto {
	private Long id;
	
	private Set<Renovation> renovations;
	
	private int floor;
	
	private String generalRemarks;
	
	private String orientation;
	
	private int rooms;
	
	private int surface;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<Renovation> getRenovations() {
		return renovations;
	}

	public void setRenovations(Set<Renovation> renovations) {
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
}
