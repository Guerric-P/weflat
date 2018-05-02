import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArchitecteClass } from '../../../../core/models/ArchitecteClass';
import { ArchitectStatusEnum } from '../../../../shared/common/enums/ArchitectStatusEnum';
import * as IBAN from 'iban';
import { ArchitecteService } from '../../../../shared/services/architecte.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-architect-detail',
  templateUrl: './architect-detail.component.html',
  styleUrls: ['./architect-detail.component.scss']
})
export class ArchitectDetailComponent implements OnInit {

  @Input() architect: ArchitecteClass;
  @Output() updated: EventEmitter<ArchitecteClass> = new EventEmitter<ArchitecteClass>();
  public ArchitectStatusEnum = ArchitectStatusEnum;

  constructor(
    private architectService: ArchitecteService,
    private notificationsService: NotificationsService
  ) { }

  get formattedIBAN() {
    return this.architect.iban ? IBAN.printFormat(this.architect.iban) : null;
  }

  ngOnInit() {
  }

  accept() {
    this.architectService.accept(this.architect.id).subscribe(res => {
      this.architect.status = ArchitectStatusEnum.VALIDATED;
      this.notificationsService.success('Architecte accepté', `L'architecte ${this.architect.firstName} ${this.architect.lastName} a bien été accepté`)
      this.updated.emit(this.architect);
    }, err => {
      this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
    });
  }

  refuse() {
    this.architectService.refuse(this.architect.id).subscribe(res => {
      this.architect.status = ArchitectStatusEnum.REFUSED;
      this.notificationsService.success('Architecte accepté', `L'architecte ${this.architect.firstName} ${this.architect.lastName} a bien été refusé`)
      this.updated.emit(this.architect);
    }, err => {
      this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
    });
  }

}
