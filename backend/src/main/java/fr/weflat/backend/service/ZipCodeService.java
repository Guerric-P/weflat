package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.ZipCode;

public interface ZipCodeService {
	ZipCode getById(Long id);
	
	ZipCode getByCode(String code);
}
