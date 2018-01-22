package fr.weflat.backend.domaine;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "acheteur")
public class Acheteur extends Utilisateur {
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "acheteur")
	private Set<Visite> visites;

	public Set<Visite> getVisites() {
		return visites;
	}

	public void setVisites(Set<Visite> visites) {
		this.visites = visites;
	}

}
