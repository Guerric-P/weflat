import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HelpHowToVisitModalComponent } from '@weflat/architect/components/help-how-to-visit-modal/help-how-to-visit-modal.component';
import { VisitClass } from '@weflat/core/models/VisitClass';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { VisitService } from '@weflat/shared/services/visit.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  potentialVisites: VisitClass[];
  plannedVisites: VisitClass[];
  reportPendingVisites: VisitClass[];
  reportWrittenVisites: VisitClass[];
  potentialVisitesExpanded: boolean;
  plannedVisitesExpanded: boolean;
  reportPendingVisitesExpanded: boolean;
  reportWrittenVisitesExpanded: boolean;
  helpDialog: MatDialogRef<HelpHowToVisitModalComponent>;

  constructor(
    private visiteService: VisitService,
    private authService: AuthenticationService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
   this.loadAllVisites();
  }

  loadAllVisites() {
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
        // TODO
      }
    );
  }

  loadPlannedVisites() {
    this.visiteService.getPlannedVisitsByArchitect(this.authService.userId).subscribe(
      res => {
        this.plannedVisites = res;
        this.plannedVisitesExpanded = this.plannedVisites && !!this.plannedVisites.length;
      }, err => {
        // TODO
      }
    );
  }

  loadReportPendingVisites() {
    this.visiteService.getReportPendingVisitsByArchitect(this.authService.userId).subscribe(
      res => {
        this.reportPendingVisites = res;
        this.reportPendingVisitesExpanded = this.reportPendingVisites && !!this.reportPendingVisites.length;
      }, err => {
        // TODO
      }
    );
  }

  loadReportWrittenVisites() {
    this.visiteService.getReportWrittenVisitsByArchitect(this.authService.userId).subscribe(
      res => {
        this.reportWrittenVisites = res;
        this.reportWrittenVisitesExpanded = this.reportWrittenVisites && !!this.reportWrittenVisites.length;
      }, err => {
        // TODO
      }
    );
  }

  openHelpDialog(event: MouseEvent) {
    this.helpDialog = this.dialog.open(HelpHowToVisitModalComponent);
    event.stopPropagation();
  }
}
