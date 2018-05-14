import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VisitClass } from '../../../../core/models/VisitClass';
import { VisitStatusEnum } from '../../../../shared/common/enums/VisitStatusEnum';

@Component({
  selector: 'admin-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {

  @Input() visit: VisitClass;
  @Output() updated: EventEmitter<VisitClass> = new EventEmitter<VisitClass>();
  public VisitStatusEnum = VisitStatusEnum;

  constructor() { }

  ngOnInit() {
  }
}
