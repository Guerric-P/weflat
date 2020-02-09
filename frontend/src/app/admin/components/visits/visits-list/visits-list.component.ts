import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { VisitClass } from '@weflat/app/core/models/VisitClass';
import { VisitStatusEnum } from '@weflat/app/shared/common/enums/VisitStatusEnum';



@Component({
  selector: 'app-visits-list',
  templateUrl: './visits-list.component.html',
  styleUrls: ['./visits-list.component.scss']
})
export class VisitsListComponent implements OnInit, OnChanges {

  @Input() visits: VisitClass[];
  @Output() visitSelected: EventEmitter<VisitClass> = new EventEmitter<VisitClass>();
  beingAssignedVisits: VisitClass[];
  canceledVisits: VisitClass[];
  inProgressVisits: VisitClass[];
  refundedVisits: VisitClass[];
  reportAvailableVisits: VisitClass[];
  reportBeingWrittenVisits: VisitClass[];
  unassignedVisits: VisitClass[];
  waitingForPaymentVisits: VisitClass[];
  architectPaidVisits: VisitClass[];
  beingAssignedVisitsExpanded: boolean;
  canceledVisitsExpanded: boolean;
  inProgressVisitsExpanded: boolean;
  refundedVisitsExpanded: boolean;
  reportAvailableVisitsExpanded: boolean;
  reportBeingWrittenVisitsExpanded: boolean;
  unassignedVisitsExpanded: boolean;
  waitingForPaymentVisitsExpanded: boolean;
  architectPaidVisitsExpanded: boolean;

  constructor() { }

  ngOnInit() {
    this.filterVisits();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterVisits();
  }

  filterVisits() {
    this.beingAssignedVisits = this.visits.filter(x => x.status === VisitStatusEnum.BEING_ASSIGNED);
    this.canceledVisits = this.visits.filter(x => x.status === VisitStatusEnum.CANCELED);
    this.inProgressVisits = this.visits.filter(x => x.status === VisitStatusEnum.IN_PROGRESS);
    this.refundedVisits = this.visits.filter(x => x.status === VisitStatusEnum.REFUNDED);
    this.reportAvailableVisits = this.visits.filter(x => x.status === VisitStatusEnum.REPORT_AVAILABLE);
    this.reportBeingWrittenVisits = this.visits.filter(x => x.status === VisitStatusEnum.REPORT_BEING_WRITTEN);
    this.unassignedVisits = this.visits.filter(x => x.status === VisitStatusEnum.UNASSIGNED);
    this.waitingForPaymentVisits = this.visits.filter(x => x.status === VisitStatusEnum.WAITING_FOR_PAYMENT);
    this.architectPaidVisits = this.visits.filter(x => x.status === VisitStatusEnum.ARCHITECT_PAID);
  }

  visitClick(visit: VisitClass) {
    this.visitSelected.emit(visit);
  }
}
