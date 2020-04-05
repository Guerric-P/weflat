import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisitClass } from '@weflat/core/models/VisitClass';
import { ZipCodeClass } from '@weflat/core/models/ZipCodeClass';
import { GoogleService } from '@weflat/core/services/google.service';
import { GooglePlaceKeys } from '@weflat/shared/common/GooglePlaceKeys';
import { values } from '@weflat/shared/common/TimeDropDownValues';
import { VisitService } from '@weflat/shared/services/visit.service';
import { ZipCodeService } from '@weflat/shared/services/zip-code.service';
import * as moment from 'moment';

declare var google;

@Component({
  selector: 'app-edit-visit-popup',
  templateUrl: './edit-visit-popup.component.html',
  styleUrls: ['./edit-visit-popup.component.scss']
})
export class EditVisitPopupComponent implements OnInit, OnDestroy {

  visitForm: FormGroup;
  visit: VisitClass;
  @ViewChild('addressInput', { static: true }) addressInput: ElementRef;
  @Output() onUpdate = new EventEmitter<VisitClass>();
  mutationObserver: MutationObserver;
  minDate = moment().add(1, 'days').toDate();

  times = values;

  options = {
    types: ['address'],
    componentRestrictions: {
      country: 'fr'
    }
  };

  get currentTimeIndex() {
    const hours = this.visit.visiteDate.getHours();
    const minutes = this.visit.visiteDate.getMinutes();
    return this.times.indexOf(this.times.find(x => x.hour === hours && x.minute === minutes));
  }

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 767px)');
  }

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data,
    private visitService: VisitService,
    private zipCodeService: ZipCodeService,
    private breakpointObserver: BreakpointObserver,
    private googleService: GoogleService
  ) { }

  ngOnInit() {

    this.visit = this.data.visit;

    this.googleService.loadGoogleMapsLibrary().subscribe(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, this.options);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.displayAddressComponents(autocomplete.getPlace());
      });
    });

    this.visitForm = this.fb.group({
      addressInput: [null],
      streetNumber: [{ value: this.visit.streetNumber, disabled: true }, Validators.required],
      route: [{ value: this.visit.route, disabled: true }, Validators.required],
      zipCode: [{ value: this.visit.zipCode.number, disabled: true }, Validators.required],
      city: [{ value: this.visit.city, disabled: true }, Validators.required],
      time: [this.currentTimeIndex, Validators.required],
      date: [this.visit.visiteDate, Validators.required],
      announcementUrl: [this.visit.announcementUrl, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]
    });

    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {

        const target = <HTMLElement>mutation.target;
        const oldTop = mutation.oldValue
          && mutation.oldValue.split(';')
            .map(x => x.split(':')
              .map(y => y.trim()))
            .find(z => z[0] === 'top');
        const oldTopValue = oldTop && oldTop[1];

        if (target.classList.contains('pac-container')
          && target.style.top
          && !target.classList.contains('weflat-touched')
          && target.style.top !== oldTopValue) {
          this.fixAutocompletePosition(target);
        } else {
          target.classList.remove('weflat-touched');
        }
      });
    });
    this.mutationObserver.observe(document, { subtree: true, attributes: true, attributeFilter: ['style'], attributeOldValue: true });
  }

  ngOnDestroy(): void {
    this.mutationObserver.disconnect();
  }


  fixAutocompletePosition(element: HTMLElement) {
    const extractOffsetRegex = /^([-\d]*)px$/;

    const pacContainerOffsetString = element.style.top;
    let pacContainerOffset = +extractOffsetRegex.exec(pacContainerOffsetString)[1];
    const htmlOffsetString = document.documentElement.style.top;
    if (!htmlOffsetString) { return; }
    const htmlOffset = +extractOffsetRegex.exec(htmlOffsetString)[1];
    pacContainerOffset -= htmlOffset;
    element.style.top = pacContainerOffset + 'px';
    element.classList.add('weflat-touched');
  }

  onSubmit() {
    if (this.visitForm.valid) {
      this.zipCodeService.getZipCodesdetails([new ZipCodeClass({ number: this.visitForm.controls['zipCode'].value })]).subscribe(res => {
        if (res[0].active !== false) {
          this.loadVisit();

          this.visitService.patch(this.visit, this.visit.id).subscribe(visit => {
            this.onUpdate.emit(visit);
          });
        } else {
          this.visitForm.controls['addressInput'].setErrors({ inactiveZipCode: true });
        }
      });

    }
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
