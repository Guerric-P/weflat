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
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "acheteur")
	private Set<Visite> visites;
	
	@Column(nullable = true, name = "project")
	private String project;

	public Set<Visite> getVisites() {
		return visites;
	}

	public void setVisites(Set<Visite> visites) {
		this.visites = visites;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

}
