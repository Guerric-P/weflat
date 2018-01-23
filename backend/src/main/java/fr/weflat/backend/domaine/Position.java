package fr.weflat.backend.domaine;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "position")
public class Position {
	@Id
	@Column(name = "id")
	private Long id;
	
	@Column(name = "label")
	private String label;
	
	@OneToOne(mappedBy = "position")
	private Renovation renovation;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Renovation getRenovation() {
		return renovation;
	}

	public void setRenovation(Renovation renovation) {
		this.renovation = renovation;
	}
}
