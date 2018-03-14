package fr.weflat.backend.web.dto;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

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
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private Set<ZipCodeDto> zipCodes;
	
	@JsonProperty(access = Access.READ_ONLY)
	private int status;
	private boolean cgu;
	
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
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public boolean isCgu() {
		return cgu;
	}
	public void setCgu(boolean cgu) {
		this.cgu = cgu;
	}
	public Set<ZipCodeDto> getZipCodes() {
		return zipCodes;
	}
	public void setZipCodes(Set<ZipCodeDto> zipCodes) {
		this.zipCodes = zipCodes;
	}
}
