package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Set;

import jakarta.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import fr.weflat.backend.domaine.Customer;
import fr.weflat.backend.domaine.User;
import fr.weflat.backend.domaine.Visit;
import fr.weflat.backend.service.CustomerService;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.UserService;
import fr.weflat.backend.service.VisitService;
import fr.weflat.backend.web.dto.CustomerDto;
import fr.weflat.backend.web.dto.UserSignupDto;
import fr.weflat.backend.web.dto.VisiteDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/customers")
public class CustomerController {
	@Autowired
	CustomerService customerService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	VisitService visitService;

	@Autowired
	MapperFacade orikaMapperFacade;
	
	@Autowired
	MailService mailService;

	@PostMapping("")
	public CustomerDto postAcheteur(@RequestBody UserSignupDto input) throws Exception {
		
		User user = userService.findByEmail(input.getEmail());

		if(user == null) {
			Customer customer = customerService.save(orikaMapperFacade.map(input, Customer.class));
			CustomerDto returnValue =  orikaMapperFacade.map(customer, CustomerDto.class);
			
			//Mail
			try {
				mailService.sendCustomerSignupMail(input.getEmail(), input.getFirstName());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return returnValue;
		}
		else {
			throw new Exception("This email already exists.");
		}
	}

	@GetMapping("/{id}")
	public CustomerDto getAcheteur(@PathVariable long id) {
		return orikaMapperFacade.map(customerService.findById(id), CustomerDto.class);
	}

	@PatchMapping("/{id}")
	public CustomerDto patchAcheteur(@PathVariable long id, @RequestBody CustomerDto input) {
		Customer acheteur = customerService.findById(id);
		orikaMapperFacade.map(input, acheteur);
		return orikaMapperFacade.map(customerService.save(acheteur), CustomerDto.class);
	}
	
	@GetMapping("/{id}/visits/waiting-for-payment")
	public List<VisiteDto> getWaitingForPaymentVisits(@PathVariable long id) {
		Set<Visit> visites = visitService.findWaitingForPaymentVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@GetMapping("/{id}/visits/being-assigned")
	public List<VisiteDto> getBeingAssignedVisits(@PathVariable long id) {
		Set<Visit> visites = visitService.findBeingAssignedVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@GetMapping("/{id}/visits/in-progress")
	public List<VisiteDto> getInProgressVisits(@PathVariable long id) {
		Set<Visit> visites = visitService.findInProgressVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@GetMapping("/{id}/visits/report-being-written")
	public List<VisiteDto> getReportBeingWrittenVisits(@PathVariable long id) {
		Set<Visit> visites = visitService.findReportBeingWrittenVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@GetMapping("/{id}/visits/report-written")
	public List<VisiteDto> getReportWrittenVisits(@PathVariable long id) {
		Set<Visit> visites = visitService.findReportWrittenVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@GetMapping("/{id}/visits/planned")
	public List<VisiteDto> getPlannedVisits(@PathVariable long id) {
		Set<Visit> visites = visitService.findPlannedVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
}
