package fr.weflat.backend.web.dto;

import java.util.Date;

public class ArchitecteDto extends UtilisateurDto {
    
	public ArchitecteDto() {
	}
	private String webSite;
	private boolean architectsOrder;
	private boolean cfai;
	private boolean professionalResponsibility;
	private boolean decennialInsurance;
	private String motivation;
	private Date practicingSince;
	private ArchitectSituationDto situation;
	private ArchitectTypeDto type;
	public String getWebSite() {
		return webSite;
	}
	public void setWebSite(String webSite) {
		this.webSite = webSite;
	}
	public boolean isArchitectsOrder() {
		return architectsOrder;
	}
	public void setArchitectsOrder(boolean architectsOrder) {
		this.architectsOrder = architectsOrder;
	}
	public boolean isCfai() {
		return cfai;
	}
	public void setCfai(boolean cfai) {
		this.cfai = cfai;
	}
	public boolean isProfessionalResponsibility() {
		return professionalResponsibility;
	}
	public void setProfessionalResponsibility(boolean professionalResponsibility) {
		this.professionalResponsibility = professionalResponsibility;
	}
	public boolean isDecennialInsurance() {
		return decennialInsurance;
	}
	public void setDecennialInsurance(boolean decennialInsurance) {
		this.decennialInsurance = decennialInsurance;
	}
	public String getMotivation() {
		return motivation;
	}
	public void setMotivation(String motivation) {
		this.motivation = motivation;
	}
	public Date getPracticingSince() {
		return practicingSince;
	}
	public void setPracticingSince(Date practicingSince) {
		this.practicingSince = practicingSince;
	}
	public ArchitectSituationDto getSituation() {
		return situation;
	}
	public void setSituation(ArchitectSituationDto situation) {
		this.situation = situation;
	}
	public ArchitectTypeDto getType() {
		return type;
	}
	public void setType(ArchitectTypeDto type) {
		this.type = type;
	}
	
	
}
