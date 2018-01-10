package fr.weflat.backend.domaine;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "zip_code")
public class ZipCode {
	
	public ZipCode() {
		super();
	}

	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "zip_code_id_seq", sequenceName = "zip_code_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "zip_code_id_seq")
	private Long id;
	
	public ZipCode(String numero) {
		super();
		this.number = numero;
	}

	@Column(nullable = false, name = "number", unique = true)
	private String number;
	
	@ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "architecte_zip_code", joinColumns = @JoinColumn(name = "id_zip_code", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "id_architecte", referencedColumnName = "id"))
	private Set<Architecte> architectes;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "zipCode")
	private Set<Visite> visites;
	
	public Set<Visite> getVisites() {
		return visites;
	}
	public void setVisites(Set<Visite> visites) {
		this.visites = visites;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String numero) {
		this.number = numero;
	}
	
    public Set<Architecte> getArchitectes() {
        return architectes;
    }
	
	public void setArchitectes(Set<Architecte> architectes) {
		this.architectes = architectes;
	}

}
