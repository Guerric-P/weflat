import { Component, OnInit, Input, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import { VisitStatusEnum } from '../../../../shared/common/enums/VisitStatusEnum';
import { VisitClass } from '../../../../core/models/VisitClass';
import { Router } from '@angular/router';
import { VisitService } from '../../../../shared/services/visit.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService } from '../../../../core/services/authentication.service';

@Component({
  selector: 'app-my-visit',
  templateUrl: './my-visit.component.html',
  styleUrls: ['./my-visit.component.scss']
})
export class MyVisitComponent implements OnInit {

  @Input() visit: VisitClass;
  @Input() datePassed: boolean;
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('cancelModal') cancelModalTemplate: TemplateRef<any>;
  cancelModal: MatDialogRef<any>;
  VisitStatusEnum = VisitStatusEnum;

  constructor(
    public authService: AuthenticationService,
    private visiteService: VisitService,
    private dialog: MatDialog,
    private notificationsService: NotificationsService,
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
    this.cancelModal = this.dialog.open(this.cancelModalTemplate);

    this.cancelModal.afterClosed().subscribe(value => {
      if (value) {
        this.visiteService.cancel(this.visit.id).subscribe(res => {
          this.notificationsService.success('Visite supprimée', 'Votre visite a bien été supprimée.');
          this.canceled.emit();
        }, err => {

        });
      }
    });


  }

  closeCancelModal() {
    this.cancelModal.close(false);
  }
}
