package fr.weflat.backend.web.controller;

import java.util.List;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.service.PositionService;
import fr.weflat.backend.web.dto.PositionDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/positions")
public class PositionController {
	@Autowired
	private PositionService positionService;
	
	@Autowired
	MapperFacade orikaMapperFacade;
	
	@RequestMapping(method=RequestMethod.GET)
    public List<PositionDto> getAll() {
		return orikaMapperFacade.mapAsList(positionService.findAll(), PositionDto.class);
	}
}
