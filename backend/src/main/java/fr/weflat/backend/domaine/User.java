package fr.weflat.backend.domaine;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "user_id_seq", sequenceName = "user_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_seq")
	private Long id;
	
	public User() {
		super();
	}

	@Column(nullable = true, name = "last_name")
	@NotNull()
    private String lastName;
	
	@Column(nullable = true, name = "first_name")
	@NotNull()
    private String firstName;
	
	@Column(nullable = true, name = "email", unique = true)
    private String email;
	
	@Column(nullable = true, name = "password")
	@Size(min=6)
	@NotNull()
    private String password;
	
	@Column(nullable = true, name = "birth_date")
    private Date birthDate;
	
	@Column(nullable = true, name = "telephone")
    private String telephone;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", orphanRemoval=true, cascade=CascadeType.ALL)
	private Set<PasswordChangeRequest> passwordChangeRequests;

	public Long getId() {
		return id;
	}

	public Set<PasswordChangeRequest> getPasswordChangeRequests() {
		return passwordChangeRequests;
	}

	public void setPasswordChangeRequests(Set<PasswordChangeRequest> passwordChangeRequests) {
		this.passwordChangeRequests = passwordChangeRequests;
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
