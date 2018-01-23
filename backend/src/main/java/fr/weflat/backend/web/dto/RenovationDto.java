package fr.weflat.backend.web.dto;

import fr.weflat.backend.domaine.Position;

public class RenovationDto {
	private Long id;
	
	private Position position;
	
	private int condition;
	
	private String remarks;
	
	private int estimatedWork;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
