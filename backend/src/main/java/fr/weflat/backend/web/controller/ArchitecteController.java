package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.ArchitecteService;
import fr.weflat.backend.web.dto.ZipCodeDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/architecte")
public class ArchitecteController {
	@Autowired
	ArchitecteService architecteService;
	
	@Autowired
	MapperFacade orikaMapperFacade;
	
	@RequestMapping(path="/{id}/zipcodes", method=RequestMethod.POST)
    public void setZipCodes(Authentication authentication, @RequestBody Set<ZipCodeDto> input) {
		Map<String, Object> details = (Map<String, Object>)authentication.getDetails();
		
		architecteService.saveZipCodesForArchitecte(orikaMapperFacade.mapAsList(input, ZipCode.class), (Long)details.get("id"));
	}
	
	@RequestMapping(path="/{id}/zipcodes", method=RequestMethod.GET)
    public List<ZipCodeDto> getZipCodes(Authentication authentication) {	
		Map<String, Object> details = (Map<String, Object>)authentication.getDetails();
		
		return orikaMapperFacade.mapAsList(architecteService.getById((Long)details.get("id")).getZipCodes(), ZipCodeDto.class);
	}

}
