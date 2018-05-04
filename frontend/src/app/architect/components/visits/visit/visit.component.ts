import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { VisiteService } from '../../../../shared/services/visite.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { VisiteClass } from '../../../../core/models/VisiteClass';
import { VisiteCounterService } from '../../../../core/services/visite-counter.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {

  constructor(private visiteService: VisiteService,
    private notificationService: NotificationsService,
    private visiteCounterService: VisiteCounterService,
    private router: Router,
    private loaderService: LoaderService) { }

  @Input() visite: VisiteClass;
  @Input() enableAcceptRefuseButtons: boolean = false;
  @Input() enableReportEditButton: boolean = false;
  @Input() enableReportViewButton: boolean = false;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  acceptButtonDisabled: boolean = false;
  refuseButtonDisabled: boolean = false;
  editButtonDisabled: boolean = false;


  ngOnInit() {
  }

  accept() {
    this.acceptButtonDisabled = true;
    this.loaderService.show();
    this.visiteService.acceptVisit(this.visite.id).subscribe(res => {
      this.notificationService.success('Succès', `Vous avez accepté de visiter le bien de ${this.visite.customer.firstName} ${this.visite.customer.lastName}`);
      this.acceptButtonDisabled = false;
      this.loaderService.hide();
      this.visitesUpdated();
    }, err => {
      this.notificationService.error('Erreur', 'Une erreur a eu lieu');
      this.acceptButtonDisabled = false;
      this.loaderService.hide();
      this.visitesUpdated();
    });
  }

  refuse() {
    this.refuseButtonDisabled = false;
    this.visiteService.refuseVisit(this.visite.id).subscribe(res => {
      this.notificationService.success('Succès', `Vous avez refusé de visiter le bien de ${this.visite.customer.firstName} ${this.visite.customer.lastName}`);
      this.refuseButtonDisabled = true;
      this.visitesUpdated();
    }, err => {
      this.notificationService.error('Erreur', 'Une erreur a eu lieu');
      this.refuseButtonDisabled = true;
      this.visitesUpdated();
    });
  }

  visitesUpdated() {
    this.updated.emit();
    this.visiteCounterService.announceCount();
  }

  editReport() {
    this.router.navigate([`/architecte/visits/${this.visite.id}/report/edit`]);
  }

  viewReport() {
    this.router.navigate([`/architecte/visits/${this.visite.id}/report`]);
  }
}
