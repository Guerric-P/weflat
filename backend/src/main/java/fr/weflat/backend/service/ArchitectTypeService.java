package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.ArchitectType;

public interface ArchitectTypeService {
	Set<ArchitectType> findAll();
}
