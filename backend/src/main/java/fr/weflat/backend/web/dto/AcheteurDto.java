package fr.weflat.backend.web.dto;

public class AcheteurDto extends UtilisateurDto {

    public AcheteurDto() {

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
