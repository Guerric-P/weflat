package fr.weflat.backend.web.controller;

import java.util.List;

import jakarta.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.service.PaymentTypeService;
import fr.weflat.backend.web.dto.PaymentTypeDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/architects/payment-types")
public class PaymentTypeController {
	@Autowired
	private PaymentTypeService paymentTypeService;
	
	@Autowired
	MapperFacade orikaMapperFacade;
	
	@GetMapping
    public List<PaymentTypeDto> getAll() {
		return orikaMapperFacade.mapAsList(paymentTypeService.findAll(), PaymentTypeDto.class);
	}
}
