package fr.weflat.backend.domaine;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

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
