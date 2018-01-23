package fr.weflat.backend.domaine;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "report")
public class Report {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "report_id_seq", sequenceName = "report_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_id_seq")
	private Long id;
	
	@OneToOne(mappedBy = "report")
	private Visite visite;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "report")
	private Set<Renovation> renovations;
	
	@Column(nullable = true, name = "floor")
	private int floor;
	
	@Column(nullable = true, name = "general_remarks")
	private String generalRemarks;
	
	@Column(nullable = true, name = "orientation")
	private String orientation;
	
	@Column(nullable = true, name = "rooms")
	private int rooms;
	
	@Column(nullable = true, name = "surface")
	private int surface;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Visite getVisite() {
		return visite;
	}

	public void setVisite(Visite visite) {
		this.visite = visite;
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
