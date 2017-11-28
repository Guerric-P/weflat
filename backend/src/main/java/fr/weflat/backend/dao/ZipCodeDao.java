package fr.weflat.backend.dao;

import org.springframework.data.repository.CrudRepository;

import fr.weflat.backend.domaine.ZipCode;

public interface ZipCodeDao extends CrudRepository<ZipCode, Long> {

	ZipCode findByNumber(String number);
}
