import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { VisiteService } from '../../../shared/services/visite.service';
import { VisitClass } from '../../../core/models/VisitClass';

@Component({
  selector: 'app-my-visits',
  templateUrl: './my-visits.component.html',
  styleUrls: ['./my-visits.component.scss']
})
export class MyVisitsComponent implements OnInit {

  beingAssignedVisits: VisitClass[];
  inProgressVisits: VisitClass[];
  reportBeingWrittenVisits: VisitClass[];
  reportWrittenVisits: VisitClass[];
  waitingForPaymentVisits: VisitClass[];
  plannedVisits: VisitClass[];

  constructor(private authService: AuthenticationService,
    private visitService: VisiteService) { }

  ngOnInit() {
    this.loadBeingAssignedVisits();
    this.loadInProgressVisits();
    this.loadPlannedVisits();
    this.loadReportBeingWrittenVisits();
    this.loadReportWrittenVisits();
    this.loadWaitingForPaymentVisits();
  }

  loadBeingAssignedVisits() {
    this.visitService.getBeingAssignedVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.beingAssignedVisits = res;
    });
  }

  loadInProgressVisits() {
    this.visitService.getInProgressVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.inProgressVisits = res;
    });
  }

  loadReportBeingWrittenVisits() {
    this.visitService.getReportBeingWrittenVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.reportBeingWrittenVisits = res;
    });
  }

  loadReportWrittenVisits() {
    this.visitService.getReportWrittenVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.reportWrittenVisits = res;
    });
  }

  loadWaitingForPaymentVisits() {
    this.visitService.getWaitingForPaymentVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.waitingForPaymentVisits = res;
    });
  }

  loadPlannedVisits() {
    this.visitService.getPlannedVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.plannedVisits = res;
    });
  }
}
