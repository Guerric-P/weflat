import { Component, OnInit } from '@angular/core';
import { VisiteClass } from '../../../../core/models/VisiteClass';
import { VisiteService } from '../../../../shared/services/visite.service';

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
    // TODO replace with lodash compose
    let compose = f => g => x => f(g(x));
    let findById = array => id => array.find(x => x.id === id);
    let findIndex = array => item => array.indexOf(item);
    let findIndexById = array => compose(findIndex(array))(findById(array));
    this.visits.splice(findIndexById(this.visits)(event.id), 1);
    this.visits = this.visits.concat([event]);
  }

}
