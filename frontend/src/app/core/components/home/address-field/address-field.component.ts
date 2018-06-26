import { Component, OnInit, ViewChild, ElementRef, NgZone, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';
import { VisitService } from '../../../../shared/services/visit.service';
import { DisabledZipCodePopupComponent } from '../../disabled-zip-code-popup/disabled-zip-code-popup.component';
import { GooglePlaceKeys } from '../../../../shared/common/GooglePlaceKeys';
import { VisitClass } from '../../../models/VisitClass';
import { ZipCodeClass } from '../../../models/ZipCodeClass';
import { GoogleService } from '../../../services/google.service';
declare var google;

@Component({
  selector: 'app-address-field',
  templateUrl: './address-field.component.html',
  styleUrls: ['./address-field.component.scss']
})
export class AddressFieldComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  @ViewChild('popup') popup: DisabledZipCodePopupComponent;
  visit: VisitClass = new VisitClass();
  place: any;

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private zone: NgZone,
    private visitService: VisitService,
    private googleService: GoogleService
  ) { }

  ngOnInit() {
    const options = {
      types: ['address'],
      componentRestrictions: {
        country: 'fr'
      }
    };

    this.googleService.executeAfterGoogleMapsIsLoaded(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, options);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.placeChanged(autocomplete);
      });
    });

    this.popup.OKFunction = () => {
      this.sessionStorageService.place = this.place;
      this.sessionStorageService.visit = this.visit;
      this.router.navigate(['/create-visit']);
    };

    this.popup.cancelFunction = () => (this.input.nativeElement as HTMLInputElement).value = null;
  }

  placeChanged(autocomplete) {
    this.zone.run(() => {
      this.place = autocomplete.getPlace();
      this.sessionStorageService.place = this.place;
      const keys = Object.keys(GooglePlaceKeys);

      for (const key of keys) {
        for (const component of this.place.address_components) {
          if (component.types.includes(GooglePlaceKeys[key])) {
            if (key !== 'zipCode') {
              this.visit[key] = component.long_name;
            } else {
              this.visit.zipCode = new ZipCodeClass({ number: component.long_name });
            }
          }
        }
      }

      this.visitService.post(this.visit).subscribe(res => {
        if (!res.zipCode.active) {
          this.popup.open(this.visit);
        } else {
          this.sessionStorageService.visit = res;
          this.router.navigate(['/create-visit']);
        }
      });
    });
  }
}
