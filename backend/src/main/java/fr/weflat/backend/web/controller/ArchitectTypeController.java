package fr.weflat.backend.web.controller;

import java.util.List;

import jakarta.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.service.ArchitectTypeService;
import fr.weflat.backend.web.dto.ArchitectTypeDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/architects/types")
public class ArchitectTypeController {
	
	@Autowired
	private ArchitectTypeService architectTypeService;
	
	@Autowired
	MapperFacade orikaMapperFacade;
	
	@GetMapping
    public List<ArchitectTypeDto> getAll() {
		return orikaMapperFacade.mapAsList(architectTypeService.findAll(), ArchitectTypeDto.class);
	}
}
