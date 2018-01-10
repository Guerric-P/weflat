package fr.weflat.backend.web.dto;

public class ArchitecteDto extends UtilisateurDto {
    
	public ArchitecteDto() {
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
