import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';
import { VisiteService } from 'app/services/visite.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  constructor(private visiteService: VisiteService,
    private notificationService: NotificationsService) { }

  @Input() visite: VisiteClass;
  @Input() enableButtons: boolean;
  @Output() updated: EventEmitter<any> = new EventEmitter();


  ngOnInit() {
  }

  accept() {
    this.visiteService.acceptVisite(this.visite.id).subscribe(res => {
      this.updated.emit();
      this.notificationService.success('Succès', `Vous avez accepté de visiter le bien de ${this.visite.acheteur.firstName} ${this.visite.acheteur.lastName}`);
    }, err => {
      this.updated.emit();
      this.notificationService.error('Erreur', 'Une erreur a eu lieu');
    });
  }

  refuse() {
    this.visiteService.refuseVisite(this.visite.id).subscribe(res => {
      this.updated.emit();
      this.notificationService.success('Succès', `Vous avez refusé de visiter le bien de ${this.visite.acheteur.firstName} ${this.visite.acheteur.lastName}`);
    }, err => {
      this.updated.emit();
      this.notificationService.error('Erreur', 'Une erreur a eu lieu');
    });
  }

}
