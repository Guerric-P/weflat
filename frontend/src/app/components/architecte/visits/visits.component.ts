import { Component, OnInit } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';
import { VisiteService } from 'app/services/visite.service';

declare var $:any;

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  constructor(private visiteService: VisiteService) { }

  potentialVisites: VisiteClass[];
  plannedVisites: VisiteClass[];

  ngOnInit() {
   this.loadAllVisites();
  }

  loadAllVisites(){
    this.loadPlannedVisites();
    this.loadPotentialVisites();
  }

  loadPotentialVisites() {
    this.visiteService.getVisites().subscribe(
      res => {
        this.potentialVisites = res;
        if(this.potentialVisites && this.potentialVisites.length){
          $('#potentialVisites').collapse('show');
        }
        else {
          $('#potentialVisites').collapse('hide');
        }
      }, err => {

      }
    );
  }

  loadPlannedVisites() {
    this.visiteService.getPlannedVisites().subscribe(
      res => {
        this.plannedVisites = res;
        if(this.plannedVisites && this.plannedVisites.length){
          $('#plannedVisites').collapse('show');
        }
        else {
          $('#plannedVisites').collapse('hide');
        }
      }, err => {

      }
    );
  }
}
