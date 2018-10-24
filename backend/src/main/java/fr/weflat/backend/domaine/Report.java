package fr.weflat.backend.domaine;

import java.util.Set;

import javax.persistence.CascadeType;
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
	private Visit visite;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "report", orphanRemoval = true)
	private Set<Renovation> renovations;
	
	@Column(nullable = true, name = "floor")
	private Long floor;
	
	@Column(nullable = true, name = "general_remarks")
	private String generalRemarks;
	
	@Column(nullable = true, name = "orientation")
	private String orientation;
	
	@Column(nullable = true, name = "rooms")
	private Long rooms;
	
	@Column(nullable = true, name = "surface")
	private Long surface;

	@Column(nullable = true, name = "expectations")
	private String expectations;
	
	@Column(nullable = true, name = "global_quality_remarks")
	private String globalQualityRemarks;
	
	@Column(nullable = true, name = "global_condition")
	private Long globalCondition;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Visit getVisite() {
		return visite;
	}

	public void setVisite(Visit visite) {
		this.visite = visite;
	}

	public Set<Renovation> getRenovations() {
		return renovations;
	}

	public void setRenovations(Set<Renovation> renovations) {
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
