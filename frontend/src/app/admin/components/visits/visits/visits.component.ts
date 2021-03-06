import { Component, OnInit } from '@angular/core';
import { VisitClass } from '@weflat/app/core/models/VisitClass';
import { findIndexById } from '@weflat/app/core/utils/arrayUtils';
import { VisitService } from '@weflat/app/shared/services/visit.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  visits: VisitClass[];
  selectedVisit: VisitClass;

  constructor(private visiteService: VisitService) { }

  ngOnInit() {
    this.visiteService.getAll().subscribe(res => {
      this.visits = res;
    });
  }

  visitSelected(visit: VisitClass) {
    this.selectedVisit = visit;
  }

  updated(event: VisitClass) {
    this.visits.splice(findIndexById(this.visits)(event.id), 1);
    this.visits = this.visits.concat([event]);
  }

}
