package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.service.ZipCodeService;
import fr.weflat.backend.web.dto.ZipCodeDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/zip-codes")
public class ZipCodeController {
	@Autowired
	MapperFacade orikaMapperFacade;

	@Autowired
	ZipCodeService zipCodeService;
	
	@RequestMapping(path="/{id}", method=RequestMethod.PATCH)
	public void patchZipCode(@PathVariable("id") long id, @RequestBody ZipCodeDto input) {
		ZipCode zipCode = zipCodeService.findById(id);
		if(zipCode == null) {
			zipCode = new ZipCode();
			zipCode.setId(id);
			zipCode.setNumber(input.getNumber());
		}
		zipCode.setActive(input.isActive());

		zipCodeService.save(zipCode);
	}
	
	@RequestMapping(path="/{id}", method=RequestMethod.DELETE)
	public void deleteZipCode(@PathVariable("id") long id) {
		zipCodeService.deleteById(id);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ZipCodeDto postZipCode(@RequestBody ZipCodeDto input) {
		return orikaMapperFacade.map(
				zipCodeService.save(
						orikaMapperFacade.map(input, ZipCode.class)
						), ZipCodeDto.class
				);
	}
	
	@RequestMapping(path="/check-status", method=RequestMethod.POST)
	public List<ZipCodeDto> checkZipCodesStatus(@RequestBody Set<ZipCodeDto> input) {
		return orikaMapperFacade.mapAsList(
				zipCodeService
				.getZipCodesByNumbers(
						input.stream()
						.map(x -> x.getNumber())
						.collect(Collectors.toSet())),
				ZipCodeDto.class
				);
	}
	
	@RequestMapping(path="/search", method=RequestMethod.GET)
	public List<ZipCodeDto> search(@RequestParam() String query) {
		return orikaMapperFacade.mapAsList(
				zipCodeService
				.getZipCodesByNumbersStartingWith(query),
				ZipCodeDto.class
				);
	}
}
