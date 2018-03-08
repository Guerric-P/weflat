import { Component, OnInit } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';
import { AuthenticationService } from 'app/services/authentication.service';
import { VisiteService } from 'app/services/visite.service';

@Component({
  selector: 'app-my-visits',
  templateUrl: './my-visits.component.html',
  styleUrls: ['./my-visits.component.scss']
})
export class MyVisitsComponent implements OnInit {

  beingAssignedVisits: VisiteClass[];
  inProgressVisits: VisiteClass[];
  reportBeingWrittenVisits: VisiteClass[];
  reportWrittenVisits: VisiteClass[];
  waitingForPaymentVisits: VisiteClass[];
  plannedVisits: VisiteClass[];

  constructor(private authService: AuthenticationService,
    private visitService: VisiteService) { }

  ngOnInit() {
    this.visitService.getBeingAssignedVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.beingAssignedVisits = res;
    });

    this.visitService.getInProgressVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.inProgressVisits = res;
    });

    this.visitService.getReportBeingWrittenVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.reportBeingWrittenVisits = res;
    });

    this.visitService.getReportWrittenVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.reportWrittenVisits = res;
    });

    this.visitService.getWaitingForPaymentVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.waitingForPaymentVisits = res;
    });

    this.visitService.getPlannedVisitsByAcheteur(this.authService.userId).subscribe(res => {
      this.plannedVisits = res;
    });
  }

}
