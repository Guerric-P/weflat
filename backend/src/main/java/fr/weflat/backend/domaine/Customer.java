package fr.weflat.backend.domaine;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer")
public class Customer extends User {
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "customer")
	private Set<Visit> visits;
	
	@Column(nullable = true, name = "project")
	private String project;

	public Set<Visit> getVisits() {
		return visits;
	}

	public void setVisits(Set<Visit> visites) {
		this.visits = visites;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

}
