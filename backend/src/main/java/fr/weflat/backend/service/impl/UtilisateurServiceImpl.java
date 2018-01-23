package fr.weflat.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.dao.UtilisateurDao;
import fr.weflat.backend.domaine.Utilisateur;
import fr.weflat.backend.service.UtilisateurService;

@Service
@Transactional
public class UtilisateurServiceImpl implements UtilisateurService {
	@Autowired
	private UtilisateurDao utilisateurDao;

	@Override
	public 	Utilisateur getByEmailAndPassword(String email, String password) {
		return utilisateurDao.findByEmailAndPassword(email, password);
	}

	@Override
	public Utilisateur getById(long id) {
		return utilisateurDao.findOne(id);
	}

	@Override
	public void save(Utilisateur utilisateur) {
		utilisateurDao.save(utilisateur);
		
	}
	
	
}
