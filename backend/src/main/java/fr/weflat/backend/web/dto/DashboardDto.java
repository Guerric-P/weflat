package fr.weflat.backend.web.dto;

import java.util.List;

public class DashboardDto {
	private List<VisiteDto> newVisits;
	private Long amountEarned;
	private Long doneVisitsCount;
	
	public List<VisiteDto> getNewVisits() {
		return newVisits;
	}
	public void setNewVisits(List<VisiteDto> newVisits) {
		this.newVisits = newVisits;
	}
	public Long getAmountEarned() {
		return amountEarned;
	}
	public void setAmountEarned(Long amountEarned) {
		this.amountEarned = amountEarned;
	}
	public Long getDoneVisitsCount() {
		return doneVisitsCount;
	}
	public void setDoneVisitsCount(Long doneVisitsCount) {
		this.doneVisitsCount = doneVisitsCount;
	}
}
