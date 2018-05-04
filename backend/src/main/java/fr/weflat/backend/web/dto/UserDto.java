package fr.weflat.backend.web.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

public class UserDto {
	
	private Long id;
    private String lastName;
    private String firstName;
    
    @JsonProperty(access = Access.READ_ONLY)
    private String email;
    
    private Date birthDate;
    private String telephone;
	private String aConnuWeflatPar;

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
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
}
