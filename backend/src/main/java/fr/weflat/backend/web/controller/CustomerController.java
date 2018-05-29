package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Set;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.domaine.Customer;
import fr.weflat.backend.domaine.User;
import fr.weflat.backend.domaine.Visit;
import fr.weflat.backend.service.CustomerService;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.UserService;
import fr.weflat.backend.service.VisitService;
import fr.weflat.backend.web.dto.ArchitectDto;
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

	@RequestMapping(path="", method=RequestMethod.POST)
	public CustomerDto postAcheteur(@RequestBody UserSignupDto input) throws Exception {
		
		User user = userService.getByEmail(input.getEmail());

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

	@RequestMapping(path="/{id}", method= RequestMethod.GET)
	public CustomerDto getAcheteur(@PathVariable("id") long id) {
		return orikaMapperFacade.map(customerService.findById(id), CustomerDto.class);
	}

	@RequestMapping(path="/{id}", method=RequestMethod.PATCH)
	public CustomerDto patchAcheteur(@PathVariable("id") long id, @RequestBody CustomerDto input) {
		Customer acheteur = customerService.findById(id);
		orikaMapperFacade.map(input, acheteur);
		return orikaMapperFacade.map(customerService.save(acheteur), CustomerDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/waiting-for-payment", method= RequestMethod.GET)
	public List<VisiteDto> getWaitingForPaymentVisits(@PathVariable("id") long id) {
		Set<Visit> visites = visitService.findWaitingForPaymentVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/being-assigned", method= RequestMethod.GET)
	public List<VisiteDto> getBeingAssignedVisits(@PathVariable("id") long id) {
		Set<Visit> visites = visitService.findBeingAssignedVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/in-progress", method= RequestMethod.GET)
	public List<VisiteDto> getInProgressVisits(@PathVariable("id") long id) {
		Set<Visit> visites = visitService.findInProgressVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/report-being-written", method= RequestMethod.GET)
	public List<VisiteDto> getReportBeingWrittenVisits(@PathVariable("id") long id) {
		Set<Visit> visites = visitService.findReportBeingWrittenVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/report-written", method= RequestMethod.GET)
	public List<VisiteDto> getReportWrittenVisits(@PathVariable("id") long id) {
		Set<Visit> visites = visitService.findReportWrittenVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
	
	@RequestMapping(path="/{id}/visits/planned", method= RequestMethod.GET)
	public List<VisiteDto> getPlannedVisits(@PathVariable("id") long id) {
		Set<Visit> visites = visitService.findPlannedVisitsByAcheteurId(id);

		return orikaMapperFacade.mapAsList(visites, VisiteDto.class);
	}
}
