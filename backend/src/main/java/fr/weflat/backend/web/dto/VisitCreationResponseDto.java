package fr.weflat.backend.web.dto;

public class VisitCreationResponseDto {
	
	public VisitCreationResponseDto(boolean complete, boolean architectsAvailable, Long visitId) {
		super();
		this.complete = complete;
		this.visitId = visitId;
		this.architectsAvailable = architectsAvailable;
	}
	
	private boolean complete;
	private boolean architectsAvailable;
	private Long visitId;
	
	public Long getVisitId() {
		return visitId;
	}
	public void setVisitId(Long visitId) {
		this.visitId = visitId;
	}
	public boolean isComplete() {
		return complete;
	}
	public void setComplete(boolean complete) {
		this.complete = complete;
	}
	public boolean isArchitectsAvailable() {
		return architectsAvailable;
	}
	public void setArchitectsAvailable(boolean architectsAvailable) {
		this.architectsAvailable = architectsAvailable;
	}
}
