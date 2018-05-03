import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VisiteClass } from '../../../../core/models/VisiteClass';
import { VisitStatusEnum } from '../../../../shared/common/enums/VisitStatusEnum';

@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.component.html',
  styleUrls: ['./visit-detail.component.scss']
})
export class VisitDetailComponent implements OnInit {

  @Input() visit: VisiteClass;
  @Output() updated: EventEmitter<VisiteClass> = new EventEmitter<VisiteClass>();
  public VisitStatusEnum = VisitStatusEnum;

  constructor() { }

  ngOnInit() {
  }

}
