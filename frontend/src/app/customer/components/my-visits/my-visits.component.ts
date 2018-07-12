import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { VisitService } from '../../../shared/services/visit.service';
import { VisitClass } from '../../../core/models/VisitClass';
import { bufferCount, map } from 'rxjs/operators';

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
      this.partialRefundAmount = res / 100;
    });
    //Second event to skip the previous value and get the fresh one
    this.visitService.getPrice().pipe(bufferCount(2), map(arr => arr[arr.length - 1])).subscribe(res => {
      this.price = res;
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
