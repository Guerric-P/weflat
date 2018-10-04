import { Component, OnInit, Input, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import { VisitStatusEnum } from '../../../../shared/common/enums/VisitStatusEnum';
import { VisitClass } from '../../../../core/models/VisitClass';
import { Router } from '@angular/router';
import { VisitService } from '../../../../shared/services/visit.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { EditVisitPopupComponent } from '../../edit-visit-popup/edit-visit-popup.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-my-visit',
  templateUrl: './my-visit.component.html',
  styleUrls: ['./my-visit.component.scss']
})
export class MyVisitComponent implements OnInit {

  @Input() visit: VisitClass;
  @Input() datePassed: boolean;
  @Input() price: number
  @Input() partialRefundAmount: number;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('cancelModal') cancelModalTemplate: TemplateRef<any>;
  cancelModal: MatDialogRef<any>;
  VisitStatusEnum = VisitStatusEnum;
  cancelButtonDisabled: boolean = false;

  constructor(
    public authService: AuthenticationService,
    private visiteService: VisitService,
    private dialog: MatDialog,
    private notificationsService: NotificationsService,
    private router: Router,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    console.log('partialRefundAmount', this.partialRefundAmount);
  }

  visitPaid() {
    this.change.emit();
  }

  viewReport() {
    this.router.navigate([`/acheteur/visits/${this.visit.id}/report`]);
  }

  cancelClick() {
    this.cancelModal = this.dialog.open(this.cancelModalTemplate);

    this.cancelModal.afterClosed().subscribe(value => {
      if (value) {
        this.cancelButtonDisabled = true;
        this.visiteService.cancel(this.visit.id).subscribe(res => {
          this.notificationsService.success('Visite supprimée', 'Votre visite a bien été supprimée.');
          this.change.emit();
          this.cancelButtonDisabled = false;
        }, err => {
          this.cancelButtonDisabled = false;
        });
      }
    });
  }

  editClick() {
    let dialog = this.dialog.open(EditVisitPopupComponent,
      // calc is a workaround for https://github.com/angular/material2/blob/master/src/cdk/overlay/position/global-position-strategy.ts
      // it allows width: 100% and maxWidth: fixed amount of pixels
      { data: { visit: this.visit }, width: 'calc(100%)', maxWidth: '500px', scrollStrategy: this.overlay.scrollStrategies.block() });

    dialog.componentInstance.onUpdate.subscribe(res => {
      this.visit = res;
      dialog.close();
    });
  }

  closeCancelModal() {
    this.cancelModal.close(false);
  }
}
