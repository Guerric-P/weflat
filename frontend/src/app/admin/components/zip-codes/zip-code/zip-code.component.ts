import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ZipCodeClass } from '../../../../core/models/ZipCodeClass';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styleUrls: ['./zip-code.component.scss']
})
export class ZipCodeComponent implements OnInit {

  @Output() deleted: EventEmitter<ZipCodeClass> = new EventEmitter<ZipCodeClass>();
  @Output() changed: EventEmitter<ZipCodeClass> = new EventEmitter<ZipCodeClass>();
  @Input() zipCode: ZipCodeClass;

  constructor() { }

  ngOnInit() {
  }

  onDeleteClick() {
    this.deleted.emit(this.zipCode);
  }

  onValueChanged(event: MatSlideToggleChange) {
    this.changed.emit(Object.assign(this.zipCode, {active: event.checked}));
  }
}
