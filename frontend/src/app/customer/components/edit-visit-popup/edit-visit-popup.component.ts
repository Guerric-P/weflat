import { Component, OnInit, Inject, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisitClass } from '../../../core/models/VisitClass';
import { GooglePlaceKeys } from '../../../shared/common/GooglePlaceKeys';
import { values } from '../../../shared/common/TimeDropDownValues';
import { ZipCodeClass } from '../../../core/models/ZipCodeClass';
import { VisitService } from '../../../shared/services/visit.service';
declare var google: any;

@Component({
  selector: 'app-edit-visit-popup',
  templateUrl: './edit-visit-popup.component.html',
  styleUrls: ['./edit-visit-popup.component.scss']
})
export class EditVisitPopupComponent implements OnInit {

  visitForm: FormGroup;
  visit: VisitClass;
  @ViewChild('addressInput') addressInput: ElementRef;
  @Output() onUpdate = new EventEmitter<VisitClass>();

  times = values;

  options = {
    types: ['address'],
    componentRestrictions: {
      country: 'fr'
    }
  };

  get currentTimeIndex() {
    let hours = this.visit.visiteDate.getHours();
    let minutes = this.visit.visiteDate.getMinutes();
    return this.times.indexOf(this.times.find(x => x.hour === hours && x.minute === minutes));
  }

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data,
    private visitService: VisitService
  ) { }

  ngOnInit() {
    this.visit = this.data.visit;

    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, this.options);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.displayAddressComponents(autocomplete.getPlace());
    });

    this.visitForm = this.fb.group({
      addressInput: [null],
      streetNumber: [{value: this.visit.streetNumber, disabled: true}, Validators.required],
      route: [{value: this.visit.route, disabled: true}, Validators.required],
      zipCode: [{value: this.visit.zipCode.number, disabled: true}, Validators.required],
      city: [{value: this.visit.city, disabled: true}, Validators.required],
      time: [this.currentTimeIndex, Validators.required],
      date: [this.visit.visiteDate, Validators.required],
      announcementUrl: [this.visit.announcementUrl]
    });
  }


  onSubmit() {
    this.loadVisit();

    this.visitService.patch(this.visit, this.visit.id).subscribe(res => {
      this.onUpdate.emit(res);
    });
  }

  
  loadVisit() {
    this.visit.city = this.visitForm.controls['city'].value;
    this.visit.route = this.visitForm.controls['route'].value;
    this.visit.streetNumber = this.visitForm.controls['streetNumber'].value;
    this.visit.zipCode = this.visitForm.controls['zipCode'].value
      ? new ZipCodeClass({ number: this.visitForm.controls['zipCode'].value }) : null;
    this.visit.announcementUrl = this.visitForm.controls['announcementUrl'].value;

    const date = <Date>this.visitForm.controls['date'].value;
    const hour = this.visitForm.controls['time'].value ? this.times[this.visitForm.controls['time'].value].hour : null;
    const minute = this.visitForm.controls['time'].value ? this.times[this.visitForm.controls['time'].value].minute : null;

    this.visit.visiteDate = date ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute) : null;
  }

  displayAddressComponents(place) {
    const keys = Object.keys(GooglePlaceKeys);

    for (const key of keys) {
      this.visitForm.controls[key].setValue(undefined);

      for (const component of place.address_components) {
        if (component.types.includes(GooglePlaceKeys[key])) {
          this.visitForm.controls[key].setValue(component.long_name);
        }
      }
    }
  }
}
