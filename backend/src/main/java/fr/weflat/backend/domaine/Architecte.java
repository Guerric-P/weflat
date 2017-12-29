package fr.weflat.backend.domaine;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "architecte")
public class Architecte extends Utilisateur {

	public Architecte() {
		super();
	}

	@Column(nullable = true, name = "zone_action")
    private String zoneAction;
	
	@Column(nullable = true, name = "book")
	private String book;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "architecte_zip_code", joinColumns = @JoinColumn(name = "id_architecte", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "id_zip_code", referencedColumnName = "id"))
	private Set<ZipCode> zipCodes;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "architecte")
	private Set<Visite> visites;

	public Set<Visite> getVisites() {
		return visites;
	}

	public void setVisites(Set<Visite> visites) {
		this.visites = visites;
	}

	public String getBook() {
		return book;
	}

	public void setBook(String book) {
		this.book = book;
	}

	public String getZoneAction() {
		return zoneAction;
	}

	public void setZoneAction(String zoneAction) {
		this.zoneAction = zoneAction;
	}

	public Set<ZipCode> getZipCodes() {
		return zipCodes;
	}

	public void setZipCodes(Set<ZipCode> zipCodes) {
		this.zipCodes = zipCodes;
	}


}
