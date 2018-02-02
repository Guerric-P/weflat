package fr.weflat.backend.domaine;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "renovation")
public class Renovation {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "renovation_id_seq", sequenceName = "renovation_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "renovation_id_seq")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_report", nullable = false)
	private Report report;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_position")
	private Position position;
	
	@Column(nullable = true, name = "condition")
	private int condition;
	
	@Column(nullable = true, name = "remarks")
	private String remarks;
	
	@Column(nullable = true, name = "estimated_work")
	private int estimatedWork;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Report getReport() {
		return report;
	}

	public void setReport(Report report) {
		this.report = report;
	}

	public Position getPosition() {
		return position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

	public int getCondition() {
		return condition;
	}

	public void setCondition(int condition) {
		this.condition = condition;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public int getEstimatedWork() {
		return estimatedWork;
	}

	public void setEstimatedWork(int estimatedWork) {
		this.estimatedWork = estimatedWork;
	}
}
