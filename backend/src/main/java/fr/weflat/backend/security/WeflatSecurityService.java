package fr.weflat.backend.security;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.weflat.backend.domaine.Visit;
import fr.weflat.backend.service.UserService;
import fr.weflat.backend.service.VisitService;

@Component("weflatSecurityService")
@Transactional
public class WeflatSecurityService {
	
	@Autowired
	VisitService visitService;
	
	@Autowired
	UserService userService;

	@SuppressWarnings("unchecked")
	public boolean hasAccessToArchitect(Authentication authentication, Long architectId) {
		if(!(authentication instanceof AnonymousAuthenticationToken)) {
			Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

			long authenticatedUserId = (long)details.get("id");
			if(authentication.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("admin"))) {
				return true;
			}
			else if(architectId == authenticatedUserId) { 
				return true;
			}
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean hasAccessToCustomer(Authentication authentication, Long customerId) {
		if(!(authentication instanceof AnonymousAuthenticationToken)) {
			Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

			long authenticatedUserId = (long)details.get("id");
			if(authentication.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("admin"))) {
				return true;
			}
			else if(customerId == authenticatedUserId) { 
				return true;
			}
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean hasAccessToVisit(Authentication authentication, Long visitId) {
		if(!(authentication instanceof AnonymousAuthenticationToken)) {
			Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

			Visit visit = visitService.findById(visitId);

			long authenticatedUserId = (long)details.get("id");

			if(authentication.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("admin"))) {
				return true;
			}
			else if(visit.getCustomer() == null || visit.getCustomer().getId() == authenticatedUserId) { 
				return true;
			}
			else if(visit.getArchitect() != null && visit.getArchitect().getId() == authenticatedUserId) { 
				return true;
			}
			else if(visit.getArchitect() == null && visit.getNearbyArchitects().stream().anyMatch(x -> x.getId() == authenticatedUserId)) {
				return true;
			}
		}
		return false;
	}
	
	@SuppressWarnings("unchecked")
	public boolean hasAccessToUser(Authentication authentication, Long userId) {
		if(!(authentication instanceof AnonymousAuthenticationToken)) {
			Map<String, Object> details = (Map<String, Object>) authentication.getDetails();

			long authenticatedUserId = (long)details.get("id");

			if(authentication.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("admin"))) {
				return true;
			}
			else if(userId == authenticatedUserId) { 
				return true;
			}
		}
		return false;
	}

}
