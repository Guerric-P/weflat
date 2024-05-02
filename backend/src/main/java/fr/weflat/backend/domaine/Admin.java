package fr.weflat.backend.domaine;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin extends User {

}
