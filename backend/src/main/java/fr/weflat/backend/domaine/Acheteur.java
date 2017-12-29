package fr.weflat.backend.domaine;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "acheteur")
public class Acheteur extends Utilisateur {
	
	@Column(nullable = true, name = "habitudes")
    private String habitudes;
	
	@Column(nullable = true, name = "envies")
    private String envies;
	
	@Column(nullable = true, name = "zone_recherche")
    private String zoneRecherche;
	
	@Column(nullable = true, name = "budget_min")
    private int budgetMin;
	
	@Column(nullable = true, name = "budget_max")
    private int budgetMax;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "acheteur")
	private Set<Visite> visites;

	public Set<Visite> getVisites() {
		return visites;
	}

	public void setVisites(Set<Visite> visites) {
		this.visites = visites;
	}

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
