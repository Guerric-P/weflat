package fr.weflat.backend.dao;

import org.springframework.data.repository.CrudRepository;
import fr.weflat.backend.domaine.Acheteur;

public interface AcheteurDao extends CrudRepository<Acheteur, Long> {
	Acheteur findById(Long id);
}
