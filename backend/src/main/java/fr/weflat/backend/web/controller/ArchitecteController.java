package fr.weflat.backend.web.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.ArchitecteService;

@RestController
@Produces("application/json")
@RequestMapping("/architecte")
public class ArchitecteController {
	@Autowired
	ArchitecteService architecteService;
	
	@RequestMapping(path="/{id}/zipcodes", method=RequestMethod.POST)
    public void setZipCodes(@PathVariable("id") long id, @RequestBody ArrayList<String> input) {
		architecteService.saveZipCodesForArchitecte(input, id);
	}
	
	@RequestMapping(path="/{id}/zipcodes", method=RequestMethod.GET)
    public Set<String> getZipCodes(@PathVariable("id") long id) {
		Architecte architecte = architecteService.getById(id);
		
		return architecteService.getById(id).getZipCodes().stream().map(x -> x.getNumber()).collect(Collectors.toSet());
	}

}
