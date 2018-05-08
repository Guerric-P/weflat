import { Component, OnInit } from '@angular/core';
import { VisiteClass } from '../../../../core/models/VisiteClass';
import { VisiteService } from '../../../../shared/services/visite.service';
import * as ArrayUtils from '../../../../core/utils/arrayUtils';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  visits: VisiteClass[];
  selectedVisit: VisiteClass;

  constructor(private visiteService: VisiteService) { }

  ngOnInit() {
    this.visiteService.getAll().subscribe(res => {
      this.visits = res;
    });
  }

  visitSelected(visit: VisiteClass) {
    this.selectedVisit = visit;
  }

  updated(event: VisiteClass) {
    this.visits.splice(ArrayUtils.findIndexById(this.visits)(event.id), 1);
    this.visits = this.visits.concat([event]);
  }

}
