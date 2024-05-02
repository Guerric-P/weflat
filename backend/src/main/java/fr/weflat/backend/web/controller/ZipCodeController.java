package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
	
	@PatchMapping("/{id}")
	public void patchZipCode(@PathVariable long id, @RequestBody ZipCodeDto input) {
		ZipCode zipCode = zipCodeService.findById(id);
		if(zipCode == null) {
			zipCode = new ZipCode();
			zipCode.setId(id);
			zipCode.setNumber(input.getNumber());
		}
		zipCode.setActive(input.isActive());

		zipCodeService.save(zipCode);
	}
	
	@DeleteMapping("/{id}")
	public void deleteZipCode(@PathVariable long id) {
		zipCodeService.deleteById(id);
	}
	
	@PostMapping( params="!bulk")
	public Object postZipCodeBulkParamNotPresent(@RequestBody ZipCodeDto input) {
		return postZipCodeBulkParamFalse(input);
	}
	
	@PostMapping( params="bulk=false")
	public Object postZipCodeBulkParamFalse(@RequestBody ZipCodeDto input) {

		return orikaMapperFacade.map(
				zipCodeService.save(
						orikaMapperFacade.map(input, ZipCode.class)
						), ZipCodeDto.class
				);
	}
	
	@PostMapping( params="bulk=true")
	public List<ZipCodeDto> bulkPostZipCodes(@RequestBody List<ZipCodeDto> input) throws Exception {

		//Custom mapping to bypass the Orika mapping designed to prevent insertions from non-admin users
		Set<ZipCode> mappedInput = input.stream().map(x -> new ZipCode(x.getNumber(), x.isActive())).collect(Collectors.toSet());
		
		return orikaMapperFacade.mapAsList(zipCodeService.bulkUpdate(mappedInput), ZipCodeDto.class);

	}
	
	@PostMapping("/details")
	public List<ZipCodeDto> checkZipCodesStatus(@RequestBody Set<ZipCodeDto> input) {
		return orikaMapperFacade.mapAsList(
				zipCodeService
				.findZipCodesByNumbers(
						input.stream()
						.map(x -> x.getNumber())
						.collect(Collectors.toSet())),
				ZipCodeDto.class
				);
	}
	
	@GetMapping("/search")
	public List<ZipCodeDto> search(@RequestParam() String query) {
		return orikaMapperFacade.mapAsList(
				zipCodeService
				.findZipCodesByNumbersStartingWith(query),
				ZipCodeDto.class
				);
	}
}
