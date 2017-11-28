package fr.weflat.backend.dao;

import org.springframework.data.repository.CrudRepository;
import fr.weflat.backend.domaine.Utilisateur;

public interface UtilisateurDao extends CrudRepository<Utilisateur, Long> {
	Utilisateur findById(Long id);

	Utilisateur findByEmailAndPassword(String email, String password);

}
