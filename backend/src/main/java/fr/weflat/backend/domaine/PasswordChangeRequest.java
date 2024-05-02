package fr.weflat.backend.domaine;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "password_change_request")
public class PasswordChangeRequest {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "password_change_request_id_seq", sequenceName = "password_change_request_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "password_change_request_id_seq")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name="none", value = ConstraintMode.NO_CONSTRAINT))
	private User user;
	
	@Column(nullable = true, name = "hash")
	private String hash;
	
	@Column(nullable = true, name = "expiration_date")
	private Date expirationDate;
	
	public PasswordChangeRequest() {
		super();
	}

	public PasswordChangeRequest(User user, String hash, Date expirationDate) {
		super();
		this.user = user;
		this.hash = hash;
		this.expirationDate = expirationDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
