package fr.weflat.backend.web.dto;

import java.util.Date;

import fr.weflat.backend.domaine.Utilisateur;

public class UtilisateurDto {

	public UtilisateurDto(Utilisateur utilisateur) {
		this.id = utilisateur.getId();
		this.lastName = utilisateur.getFirstName();
		this.firstName = utilisateur.getLastName();
		this.email = utilisateur.getEmail();
		this.password = utilisateur.getPassword();
		this.birthDate = utilisateur.getDateNaissance();
		this.telephone = utilisateur.getTelephone();
	}
	
	private Long id;
	
    private String lastName;
	
    private String firstName;
	
    private String email;
	
    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	private String password;
	
    private Date birthDate;
	
    private String telephone;
	
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return lastName;
	}

	public void setNom(String nom) {
		this.lastName = nom;
	}

	public String getPrenom() {
		return firstName;
	}

	public void setPrenom(String prenom) {
		this.firstName = prenom;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getDateNaissance() {
		return birthDate;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.birthDate = dateNaissance;
	}

	public String getNumeroTelephone() {
		return telephone;
	}

	public void setNumeroTelephone(String numeroTelephone) {
		this.telephone = numeroTelephone;
	}

	public String getaConnuWeflatPar() {
		return aConnuWeflatPar;
	}

	public void setaConnuWeflatPar(String aConnuWeflatPar) {
		this.aConnuWeflatPar = aConnuWeflatPar;
	}

	private String aConnuWeflatPar;
}
