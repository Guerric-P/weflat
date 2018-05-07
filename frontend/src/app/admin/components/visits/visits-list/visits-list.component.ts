import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { VisiteClass } from '../../../../core/models/VisiteClass';
import { VisitStatusEnum } from '../../../../shared/common/enums/VisitStatusEnum';

@Component({
  selector: 'app-visits-list',
  templateUrl: './visits-list.component.html',
  styleUrls: ['./visits-list.component.scss']
})
export class VisitsListComponent implements OnInit {

  @Input() visits: VisiteClass[];
  @Output() visitSelected: EventEmitter<VisiteClass> = new EventEmitter<VisiteClass>();
  beingAssignedVisits: VisiteClass[];
  canceledVisits: VisiteClass[];
  inProgressVisits: VisiteClass[];
  refundedVisits: VisiteClass[];
  reportAvailableVisits: VisiteClass[];
  reportBeingWrittenVisits: VisiteClass[];
  unassignedVisits: VisiteClass[];
  waitingForPaymentVisits: VisiteClass[];
  beingAssignedVisitsExpanded: boolean;
  canceledVisitsExpanded: boolean;
  inProgressVisitsExpanded: boolean;
  refundedVisitsExpanded: boolean;
  reportAvailableVisitsExpanded: boolean;
  reportBeingWrittenVisitsExpanded: boolean;
  unassignedVisitsExpanded: boolean;
  waitingForPaymentVisitsExpanded: boolean;

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
  }

  visitClick(visit: VisiteClass) {
    this.visitSelected.emit(visit);
  }
}
