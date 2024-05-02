package fr.weflat.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Predicate;

import fr.weflat.backend.dao.PasswordChangeRequestDao;
import fr.weflat.backend.domaine.PasswordChangeRequest;
import fr.weflat.backend.domaine.QPasswordChangeRequest;
import fr.weflat.backend.service.PasswordChangeRequestService;

@Service
@Transactional
public class PasswordChangeRequestServiceImpl implements PasswordChangeRequestService {
	@Autowired
	private PasswordChangeRequestDao passwordChangeRequestDao;

	@Override
	@Transactional(readOnly=true)
	public PasswordChangeRequest findByHash(String hash) {
		QPasswordChangeRequest passwordChangeRequest = QPasswordChangeRequest.passwordChangeRequest;
		
		Predicate predicate = passwordChangeRequest.hash.eq(hash);
		
		return passwordChangeRequestDao.findOne(predicate).orElseThrow();
		
	}

	@Override
	public PasswordChangeRequest save(PasswordChangeRequest passwordChangeRequest) {
		return passwordChangeRequestDao.save(passwordChangeRequest);
	}
}
