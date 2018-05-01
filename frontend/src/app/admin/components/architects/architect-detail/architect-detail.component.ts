import { Component, OnInit, Input } from '@angular/core';
import { ArchitecteClass } from '../../../../core/models/ArchitecteClass';
import { ArchitectStatusEnum } from '../../../../shared/common/enums/ArchitectStatusEnum';
import * as IBAN from 'iban';

@Component({
  selector: 'app-architect-detail',
  templateUrl: './architect-detail.component.html',
  styleUrls: ['./architect-detail.component.scss']
})
export class ArchitectDetailComponent implements OnInit {

  @Input() architect: ArchitecteClass;
  public ArchitectStatusEnum = ArchitectStatusEnum;

  constructor() { }

  get formattedIBAN() {
    return this.architect.iban ? IBAN.printFormat(this.architect.iban) : null;
  }

  ngOnInit() {
  }

}
