package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Set;

import jakarta.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.domaine.User;
import fr.weflat.backend.domaine.Visit;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.enums.ArchitectStatusEnum;
import fr.weflat.backend.service.ArchitectService;
import fr.weflat.backend.service.MailService;
import fr.weflat.backend.service.UserService;
import fr.weflat.backend.service.VisitService;
import fr.weflat.backend.service.ZipCodeService;
import fr.weflat.backend.web.dto.ArchitectDto;
import fr.weflat.backend.web.dto.DashboardDto;
import fr.weflat.backend.web.dto.UserSignupDto;
import fr.weflat.backend.web.dto.VisiteDto;
import fr.weflat.backend.web.dto.ZipCodeDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/architects")
public class ArchitectController {
	@Autowired
	ArchitectService architectService;
	
	@Autowired
	UserService userService;

	@Autowired
	MapperFacade orikaMapperFacade;

	@Autowired
	VisitService visitService;

	@Autowired
	ZipCodeService zipCodeService;
	
	@Autowired
	MailService mailService;

	@PostMapping("/{id}/zip-codes")
	public void setZipCodes(@PathVariable long id, @RequestBody Set<ZipCodeDto> input) {
		architectService.saveZipCodesForArchitecte(orikaMapperFacade.mapAsList(input, ZipCode.class), id);
	}

	@GetMapping("/{id}/zip-codes")
	public List<ZipCodeDto> getZipCodes(@PathVariable long id) {	
		return orikaMapperFacade.mapAsList(architectService.findById(id).getZipCodes(), ZipCodeDto.class);
	}

	@GetMapping("/{id}")
	public @ResponseBody ArchitectDto getArchitecte(@PathVariable long id) {
		return orikaMapperFacade.map(architectService.findById(id), ArchitectDto.class);
	}
	
	@GetMapping
	public @ResponseBody List<ArchitectDto> getAll() {
		return orikaMapperFacade.mapAsList(architectService.findAll(), ArchitectDto.class);
	}

	@PostMapping("")
	public ArchitectDto postArchitecte(@RequestBody UserSignupDto input) throws Exception {
		
		User user = userService.findByEmail(input.getEmail());

		if(user == null) {
			Architect architect = orikaMapperFacade.map(input, Architect.class);
			architect.setStatus(ArchitectStatusEnum.CREATED.ordinal());
			ArchitectDto returnValue = orikaMapperFacade.map(architectService.save(architect), ArchitectDto.class);
			
			//Mail
			try {
				mailService.sendArchitectSignupMail(architect.getEmail(), architect.getFirstName());
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

	@PatchMapping("/{id}")
	public ArchitectDto patchArchitecte(@PathVariable long id, @RequestBody ArchitectDto input) {

		Architect architect = architectService.findById(id);
		orikaMapperFacade.map(input, architect);
		return orikaMapperFacade.map(architectService.save(architect), ArchitectDto.class);

	}

	@GetMapping("/{id}/visits/available")
	public List<VisiteDto> getVisites(@PathVariable long id) {
		Set<Visit> visits = visitService.findAvailableVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visits, VisiteDto.class);
	}

	@GetMapping("/{id}/visits/planned")
	public List<VisiteDto> getPlannedVisites(@PathVariable long id) {
		Set<Visit> visits = visitService.findPlannedVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visits, VisiteDto.class);
	}

	@GetMapping("/{id}/visits/report-pending")
	public List<VisiteDto> getReportPendingVisites(@PathVariable long id) {
		Set<Visit> visits = visitService.findReportPendingVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visits, VisiteDto.class);
	}

	@GetMapping("/{id}/visits/report-written")
	public List<VisiteDto> getReportWrittenVisites(@PathVariable long id) {
		Set<Visit> visits = visitService.findReportWrittenVisitsByArchitectId(id);

		return orikaMapperFacade.mapAsList(visits, VisiteDto.class);
	}
	
	@PostMapping("/{id}/accept")
	public void acceptArchitect(@PathVariable long id) throws Exception {
		architectService.accept(id);
	}
	
	@PostMapping("/{id}/refuse")
	public void refuseArchitect(@PathVariable long id) throws Exception {
		architectService.refuse(id);
	}
	
	@GetMapping("/{id}/dashboard")
	public DashboardDto getDashboard(@PathVariable long id) {
		
		DashboardDto dto = new DashboardDto();
		dto.setAmountEarned(visitService.getAmountEarned(id));
		dto.setDoneVisitsCount(visitService.getDoneVisitsCount(id));
		dto.setNewVisits(orikaMapperFacade.mapAsList(visitService.findAvailableVisitsByArchitectId(id), VisiteDto.class));
		
		return dto;
	}
}
