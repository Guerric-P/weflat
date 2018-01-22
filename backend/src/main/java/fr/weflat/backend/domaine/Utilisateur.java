package fr.weflat.backend.domaine;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.SequenceGenerator;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Utilisateur {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "utilisateur_id_seq", sequenceName = "utilisateur_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "utilisateur_id_seq")
	private Long id;
	
	public Utilisateur() {
		super();
	}

	@Column(nullable = true, name = "last_name")
    private String lastName;
	
	@Column(nullable = true, name = "first_name")
    private String firstName;
	
	@Column(nullable = true, name = "email", unique = true)
    private String email;
	
	@Column(nullable = true, name = "password")
    private String password;
	
	@Column(nullable = true, name = "birth_date")
    private Date birthDate;
	
	@Column(nullable = true, name = "telephone")
    private String telephone;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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
	
}
