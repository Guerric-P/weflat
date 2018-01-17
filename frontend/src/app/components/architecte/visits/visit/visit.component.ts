import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';
import { VisiteService } from 'app/services/visite.service';
import { NotificationsService } from 'angular2-notifications';
import { VisiteCounterService } from 'app/services/visite-counter.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  constructor(private visiteService: VisiteService,
    private notificationService: NotificationsService,
    private visiteCounterService: VisiteCounterService) { }

  @Input() visite: VisiteClass;
  @Input() enableButtons: boolean;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  acceptButtonDisabled: boolean = false;
  refuseButtonDisabled: boolean = false;


  ngOnInit() {
  }

  accept() {
    this.acceptButtonDisabled = true;
    this.visiteService.acceptVisite(this.visite.id).subscribe(res => {
      this.notificationService.success('Succès', `Vous avez accepté de visiter le bien de ${this.visite.acheteur.firstName} ${this.visite.acheteur.lastName}`);
      this.acceptButtonDisabled = false;
      this.visitesUpdated();
    }, err => {
      this.notificationService.error('Erreur', 'Une erreur a eu lieu');
      this.acceptButtonDisabled = false;
      this.visitesUpdated();
    });
  }

  refuse() {
    this.refuseButtonDisabled = false;
    this.visiteService.refuseVisite(this.visite.id).subscribe(res => {
      this.notificationService.success('Succès', `Vous avez refusé de visiter le bien de ${this.visite.acheteur.firstName} ${this.visite.acheteur.lastName}`);
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
}
