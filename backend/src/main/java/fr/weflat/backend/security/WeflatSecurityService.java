package fr.weflat.backend.security;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.service.VisiteService;

@Component("weflatSecurityService")
@Transactional
public class WeflatSecurityService {
	
	@Autowired
	VisiteService visiteService;

	@SuppressWarnings("unchecked")
	public boolean hasAccessToArchitecte(Authentication authentication, Long architecteId) {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		
		long authenticatedUserId = (long)details.get("id");
		if(authentication.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("admin"))) {
			return true;
		}
		else if(architecteId == authenticatedUserId) { 
			return true;
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean hasAccessToAcheteur(Authentication authentication, Long acheteurId) {
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		
		long authenticatedUserId = (long)details.get("id");
		if(authentication.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("admin"))) {
			return true;
		}
		else if(acheteurId == authenticatedUserId) { 
			return true;
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean hasAccessToVisit(Authentication authentication, Long visitId) {
		
		Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
		
		Visite visit = visiteService.getById(visitId);
		
		long authenticatedUserId = (long)details.get("id");
		
		if(authentication.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("admin"))) {
			return true;
		}
		else if(visit.getAcheteur() == null || visit.getAcheteur().getId() == authenticatedUserId) { 
			return true;
		}
		else if(visit.getArchitecte() != null && visit.getArchitecte().getId() == authenticatedUserId) { 
			return true;
		}
		return false;
	}
	
	

}
