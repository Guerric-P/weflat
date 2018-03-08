import { Component, OnInit } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';
import { VisiteService } from 'app/services/visite.service';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  constructor(private visiteService: VisiteService, private authService: AuthenticationService) { }

  potentialVisites: VisiteClass[];
  plannedVisites: VisiteClass[];
  reportPendingVisites: VisiteClass[];
  reportWrittenVisites: VisiteClass[];
  potentialVisitesExpanded: boolean;
  plannedVisitesExpanded: boolean;
  reportPendingVisitesExpanded: boolean;
  reportWrittenVisitesExpanded: boolean;

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
    this.visiteService.getAvailableVisitsByArchitect(this.authService.userId).subscribe(
      res => {
        this.potentialVisites = res;
        this.potentialVisitesExpanded = this.potentialVisites && !!this.potentialVisites.length;
      }, err => {
        //TODO
      }
    );
  }

  loadPlannedVisites() {
    this.visiteService.getPlannedVisitsByArchitect(this.authService.userId).subscribe(
      res => {
        this.plannedVisites = res;
        this.plannedVisitesExpanded = this.plannedVisites && !!this.plannedVisites.length;
      }, err => {
        //TODO
      }
    );
  }

  loadReportPendingVisites() {
    this.visiteService.getReportPendingVisitsByArchitect(this.authService.userId).subscribe(
      res => {
        this.reportPendingVisites = res;
        this.reportPendingVisitesExpanded = this.reportPendingVisites && !!this.reportPendingVisites.length;
      }, err => {
        //TODO
      }
    );
  }

  loadReportWrittenVisites() {
    this.visiteService.getReportWrittenVisitsByArchitect(this.authService.userId).subscribe(
      res => {
        this.reportWrittenVisites = res;
        this.reportWrittenVisitesExpanded = this.reportWrittenVisites && !!this.reportWrittenVisites.length;
      }, err => {
        //TODO
      }
    );
  }
}
