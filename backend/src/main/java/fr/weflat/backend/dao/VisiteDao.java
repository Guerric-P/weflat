package fr.weflat.backend.dao;

import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.Visite;

public interface VisiteDao  extends CrudRepository<Visite, Long> {

}
