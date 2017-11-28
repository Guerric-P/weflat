package fr.weflat.backend.web.dto;

import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.Utilisateur;

public class ArchitecteDto extends UtilisateurDto {
    
	public ArchitecteDto(Utilisateur utilisateur) {
		super(utilisateur);
		// TODO Auto-generated constructor stub
	}
	
	public ArchitecteDto(Architecte architecte) {
		super(architecte);
		this.zoneAction = architecte.getZoneAction();
		
	}

	private String zoneAction;
	private String book;

	public String getZoneAction() {
		return zoneAction;
	}

	public String getBook() {
		return book;
	}

	public void setBook(String book) {
		this.book = book;
	}

	public void setZoneAction(String zoneAction) {
		this.zoneAction = zoneAction;
	}
}
