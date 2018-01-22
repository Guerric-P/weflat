package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.ArchitecteService;
import fr.weflat.backend.web.dto.ArchitecteDto;
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
	
	@SuppressWarnings("unchecked")
	@RequestMapping(path="/{id}/zipcodes", method=RequestMethod.POST)
    public void setZipCodes(Authentication authentication, @RequestBody Set<ZipCodeDto> input) {
		Map<String, Object> details = (Map<String, Object>)authentication.getDetails();
		
		architecteService.saveZipCodesForArchitecte(orikaMapperFacade.mapAsList(input, ZipCode.class), (Long)details.get("id"));
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(path="/{id}/zipcodes", method=RequestMethod.GET)
    public List<ZipCodeDto> getZipCodes(Authentication authentication) {	
		Map<String, Object> details = (Map<String, Object>)authentication.getDetails();
		
		return orikaMapperFacade.mapAsList(architecteService.getById((Long)details.get("id")).getZipCodes(), ZipCodeDto.class);
	}
	
	@RequestMapping(path="/{id}", method=RequestMethod.GET)
    public @ResponseBody ArchitecteDto getArchitecte(@PathVariable("id") long id) {
        return orikaMapperFacade.map(architecteService.getById(id), ArchitecteDto.class);
	}
	
	@RequestMapping(path="", method=RequestMethod.POST)
    public String postArchitecte(@RequestBody ArchitecteDto input) {
		
		architecteService.save(orikaMapperFacade.map(input, Architecte.class));
		
		return "";
    }
}
