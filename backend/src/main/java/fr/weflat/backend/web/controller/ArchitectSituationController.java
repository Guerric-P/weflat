package fr.weflat.backend.web.controller;

import java.util.List;
import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.service.ArchitectSituationService;
import fr.weflat.backend.web.dto.ArchitectSituationDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/architecte/situations")
public class ArchitectSituationController {
	
	@Autowired
	private ArchitectSituationService architectSituationService;
	
	@Autowired
	MapperFacade orikaMapperFacade;
	
	@RequestMapping(method=RequestMethod.GET)
    public List<ArchitectSituationDto> getAll() {
		return orikaMapperFacade.mapAsList(architectSituationService.getAll(), ArchitectSituationDto.class);
	}
}
