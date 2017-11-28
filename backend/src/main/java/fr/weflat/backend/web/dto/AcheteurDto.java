package fr.weflat.backend.web.dto;

import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.domaine.Utilisateur;

public class AcheteurDto extends UtilisateurDto {

    public AcheteurDto(Utilisateur utilisateur) {
		super(utilisateur);
		// TODO Auto-generated constructor stub
	}
    
    public AcheteurDto(Acheteur acheteur) {
    	super(acheteur);
    	this.habitudes = acheteur.getHabitudes();
    	this.envies = acheteur.getEnvies();
    	this.zoneRecherche = acheteur.getZoneRecherche();
    	this.budgetMin = acheteur.getBudgetMin();
    	this.budgetMax = acheteur.getBudgetMax();
    }

	private String habitudes;
	
    private String envies;
	
    private String zoneRecherche;
	
    private int budgetMin;
    
    private int budgetMax;

	public String getHabitudes() {
		return habitudes;
	}

	public void setHabitudes(String habitudes) {
		this.habitudes = habitudes;
	}

	public String getEnvies() {
		return envies;
	}

	public void setEnvies(String envies) {
		this.envies = envies;
	}

	public String getZoneRecherche() {
		return zoneRecherche;
	}

	public void setZoneRecherche(String zoneRecherche) {
		this.zoneRecherche = zoneRecherche;
	}

	public int getBudgetMin() {
		return budgetMin;
	}

	public void setBudgetMin(int budgetMin) {
		this.budgetMin = budgetMin;
	}

	public int getBudgetMax() {
		return budgetMax;
	}

	public void setBudgetMax(int budgetMax) {
		this.budgetMax = budgetMax;
	}
}
