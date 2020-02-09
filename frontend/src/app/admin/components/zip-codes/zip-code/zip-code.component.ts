import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ZipCodeClass } from '@weflat/app/core/models/ZipCodeClass';


@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styleUrls: ['./zip-code.component.scss']
})
export class ZipCodeComponent implements OnInit {

  @Output() deleted: EventEmitter<ZipCodeClass> = new EventEmitter<ZipCodeClass>();
  @Output() changed = new EventEmitter<ZipCodeClass>();
  @Input() zipCode: ZipCodeClass;

  constructor() { }

  ngOnInit() {
  }

  onDeleteClick() {
    this.deleted.emit(this.zipCode);
  }

  onValueChanged(event: MatSlideToggleChange) {
    this.changed.emit(Object.assign({}, this.zipCode, { active: event.checked }));
  }
}
