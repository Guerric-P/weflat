import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VisitStatusEnum } from '../../../../shared/common/enums/VisitStatusEnum';
import { VisiteClass } from '../../../../core/models/VisiteClass';
import { Router } from '@angular/router';
import { VisiteService } from '../../../../shared/services/visite.service';

@Component({
  selector: 'app-my-visit',
  templateUrl: './my-visit.component.html',
  styleUrls: ['./my-visit.component.scss']
})
export class MyVisitComponent implements OnInit {

  @Input() visit: VisiteClass;
  @Input() datePassed: boolean;
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();
  VisitStatusEnum = VisitStatusEnum;

  constructor(
    private visiteService: VisiteService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  visitPaid() {
  }

  viewReport() {
    this.router.navigate([`/acheteur/visits/${this.visit.id}/report`]);
  }

  cancelClick() {
    this.visiteService.cancel(this.visit.id).subscribe(res => {
      this.canceled.emit();
    }, err => {

    });
  }

}
