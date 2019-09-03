import { Component, OnInit } from '@angular/core';
import { VisitClass } from '@weflat/core/models/VisitClass';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { VisitService } from '@weflat/shared/services/visit.service';

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
  partialRefundAmount: number;
  price: number;

  constructor(private authService: AuthenticationService,
    private visitService: VisitService) { }

  ngOnInit() {
    this.loadVisits();
    this.visitService.getPartialRefundAmount().subscribe(res => {
      res.subscribe(x => {
        this.partialRefundAmount = x / 100;
      });
    });
    this.visitService.getPrice().subscribe(res => {
      res.subscribe(x => {
        this.price = x;
      })
    });
  }

  loadVisits() {
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

  get isVisitsEmpty(): boolean {
    return !(this.beingAssignedVisits && !!this.beingAssignedVisits.length)
      && !(this.inProgressVisits && !!this.inProgressVisits.length)
      && !(this.reportBeingWrittenVisits && !!this.reportBeingWrittenVisits.length)
      && !(this.reportWrittenVisits && !!this.reportWrittenVisits.length)
      && !(this.waitingForPaymentVisits && !!this.waitingForPaymentVisits.length)
      && !(this.plannedVisits && !!this.plannedVisits.length);
  }
}
