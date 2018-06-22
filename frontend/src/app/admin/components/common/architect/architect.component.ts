import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArchitectClass } from '../../../../core/models/ArchitectClass';
import { ArchitectStatusEnum } from '../../../../shared/common/enums/ArchitectStatusEnum';
import { ArchitectService } from '../../../../shared/services/architecte.service';
import { NotificationsService } from 'angular2-notifications';
import * as IBAN from 'iban';

@Component({
  selector: 'app-architect',
  templateUrl: './architect.component.html',
  styleUrls: ['./architect.component.scss']
})
export class ArchitectComponent implements OnInit {

  @Input() architect: ArchitectClass;
  @Output() updated: EventEmitter<ArchitectClass> = new EventEmitter<ArchitectClass>();
  public ArchitectStatusEnum = ArchitectStatusEnum;

  constructor(
    private architectService: ArchitectService,
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
      this.notificationsService.success(
        'Architecte accepté',
        `L'architecte ${this.architect.firstName} ${this.architect.lastName} a bien été accepté`
      );
      this.updated.emit(this.architect);
    }, err => {
      this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
    });
  }

  refuse() {
    this.architectService.refuse(this.architect.id).subscribe(res => {
      this.architect.status = ArchitectStatusEnum.REFUSED;
      this.notificationsService.success(
        'Architecte accepté',
        `L'architecte ${this.architect.firstName} ${this.architect.lastName} a bien été refusé`
      );
      this.updated.emit(this.architect);
    }, err => {
      this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
    });
  }

}
