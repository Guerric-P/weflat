package fr.weflat.backend.web.dto;

public class TestDto {

	public TestDto(String valeur) {
		this.valeur = valeur;
	}
	
	private String valeur;

	public String getValeur() {
		return valeur;
	}

	public void setValeur(String valeur) {
		this.valeur = valeur;
	}
}
