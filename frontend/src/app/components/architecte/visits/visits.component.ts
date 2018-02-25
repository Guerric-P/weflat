import { Component, OnInit } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';
import { VisiteService } from 'app/services/visite.service';
import { AuthenticationService } from 'app/services/authentication.service';

declare var $:any;

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  constructor(private visiteService: VisiteService, private authService: AuthenticationService) { }

  potentialVisites: VisiteClass[];
  plannedVisites: VisiteClass[];
  reportPendingVisites: VisiteClass[];
  reportWrittenVisites: VisiteClass[];

  ngOnInit() {
   this.loadAllVisites();
  }

  loadAllVisites(){
    this.loadPlannedVisites();
    this.loadPotentialVisites();
    this.loadReportPendingVisites();
    this.loadReportWrittenVisites();
  }

  loadPotentialVisites() {
    this.visiteService.getAvailableVisits(this.authService.userId).subscribe(
      res => {
        this.potentialVisites = res;
        if(this.potentialVisites && this.potentialVisites.length){
          $('#potentialVisites').collapse('show');
        }
        else {
          $('#potentialVisites').collapse('hide');
        }
      }, err => {
        //TODO
      }
    );
  }

  loadPlannedVisites() {
    this.visiteService.getPlannedVisits(this.authService.userId).subscribe(
      res => {
        this.plannedVisites = res;
        if(this.plannedVisites && this.plannedVisites.length){
          $('#plannedVisites').collapse('show');
        }
        else {
          $('#plannedVisites').collapse('hide');
        }
      }, err => {
        //TODO
      }
    );
  }

  loadReportPendingVisites() {
    this.visiteService.getReportPendingVisites(this.authService.userId).subscribe(
      res => {
        this.reportPendingVisites = res;
        if(this.reportPendingVisites && this.reportPendingVisites.length){
          $('#reportPendingVisites').collapse('show');
        }
        else {
          $('#reportPendingVisites').collapse('hide');
        }
      }, err => {
        //TODO
      }
    );
  }

  loadReportWrittenVisites() {
    this.visiteService.getReportWrittenVisites(this.authService.userId).subscribe(
      res => {
        this.reportWrittenVisites = res;
        if(this.reportWrittenVisites && this.reportWrittenVisites.length){
          $('#reportWrittenVisites').collapse('show');
        }
        else {
          $('#reportWrittenVisites').collapse('hide');
        }
      }, err => {
        //TODO
      }
    );
  }
}
