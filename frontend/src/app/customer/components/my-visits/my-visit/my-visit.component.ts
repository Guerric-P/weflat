import { Component, OnInit, Input } from '@angular/core';
import { VisitStatusEnum } from '../../../../shared/common/enums/VisitStatusEnum';
import { VisiteClass } from '../../../../core/models/VisiteClass';

@Component({
  selector: 'app-my-visit',
  templateUrl: './my-visit.component.html',
  styleUrls: ['./my-visit.component.scss']
})
export class MyVisitComponent implements OnInit {

  @Input() visit: VisiteClass;
  @Input() datePassed: boolean;
  VisitStatusEnum = VisitStatusEnum;

  constructor() { }

  ngOnInit() {
  }

  visitPaid() {
    console.log("paid");
  }

}
