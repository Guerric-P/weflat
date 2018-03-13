import { Component, OnInit, Input } from '@angular/core';
import { VisitStatusEnum } from '../../../../shared/common/enums/VisitStatusEnum';
import { VisiteClass } from '../../../../core/models/VisiteClass';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-visit',
  templateUrl: './my-visit.component.html',
  styleUrls: ['./my-visit.component.scss']
})
export class MyVisitComponent implements OnInit {

  @Input() visit: VisiteClass;
  @Input() datePassed: boolean;
  VisitStatusEnum = VisitStatusEnum;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  visitPaid() {
    console.log("paid");
  }

  viewReport() {
    this.router.navigate([`/acheteur/visits/${this.visit.id}/report`]);
  }

}
