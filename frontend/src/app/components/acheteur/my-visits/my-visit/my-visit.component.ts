import { Component, OnInit, Input } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';
import { VisitStatusEnum } from 'app/common/enums/VisitStatusEnum';

@Component({
  selector: 'app-my-visit',
  templateUrl: './my-visit.component.html',
  styleUrls: ['./my-visit.component.css']
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
