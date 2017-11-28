import { Component, OnInit, Inject, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ArchitecteService } from 'app/services/architecte.service';
import { LocalStorageService } from 'app/services/local-storage.service';

declare var google: any;

@Component({
  selector: 'app-architecte-profile',
  templateUrl: './architecte-profile.component.html',
  styleUrls: ['./architecte-profile.component.css']
})
export class ArchitecteProfileComponent implements OnInit {

  constructor(
    private ref: ChangeDetectorRef,
    private architecteService: ArchitecteService,
    private localStorageService: LocalStorageService) { }

  index: number = 0;
  zipCodes: any[] = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER];
  map: any;
  markers: any = {};

  tabChanged($event) {
    if ($event.index === 1) {

      if (!this.map) {
        this.map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 10,
          center: new google.maps.LatLng(45.767519, 4.832526)
        });
      }

      this.getZipCodes();

      var input = document.getElementById('zip-code-input') as HTMLInputElement;
      var options = {
        types: ['(regions)'],
        componentRestrictions: {
          country: 'fr'
        }
      };
      var self = this;
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        if (place && place.address_components) {
          for (var i = 0; i < place.address_components.length; i++) {
            for (var j = 0; j < place.address_components[i].types.length; j++) {
              if (place.address_components[i].types[j] == "postal_code") {
                if ((place.address_components[i].long_name || '').trim()) {
                  if (!self.markers[place.address_components[i].long_name.trim()]) {
                    self.zipCodes.push([
                      place.address_components[i].long_name.trim(),
                      place.geometry.location.lat,
                      place.geometry.location.lng
                    ]);

                    self.placeMarker(place.address_components[i].long_name.trim(), place);
                  }
                }

                // Reset the input value
                if (input) {
                  input.value = '';
                }
              }
            }
          }
        }
      })

      this.drawMap();

    }
  }

  drawMap() {

  };

  ngOnInit() {

  }

  placeMarker(zipCode: string, place: any) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
      map: this.map
    });

    this.markers[zipCode] = marker;

    this.map.fitBounds(new google.maps.LatLngBounds(
      {
        lat: place.geometry.viewport.getSouthWest().lat(),
        lng: place.geometry.viewport.getSouthWest().lng()
      }, {
        lat: place.geometry.viewport.getNorthEast().lat(),
        lng: place.geometry.viewport.getNorthEast().lng()
      }
    )
    )

    this.ref.detectChanges();
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.zipCodes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(zipCode: any): void {
    let index = this.zipCodes.indexOf(zipCode);

    if (index >= 0) {
      this.zipCodes.splice(index, 1);
    }

    this.markers[zipCode[0]].setMap(null);

    this.ref.detectChanges();
  }

  submitZipCodes() {
    this.architecteService.postZipCodes(this.zipCodes.map(x => x[0]), this.localStorageService.tokenPayload.id).subscribe(x => { }, err => console.log(err));
  }

  getZipCodeLocation(zipCode: string, callback: any, self: any) {
    new google.maps.Geocoder().geocode({ 'address': zipCode }, function (results, status) {
      if (status == 'OK') {
        return callback(zipCode, results[0], self);
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  getZipCodes() {
    this.architecteService.getZipCodes(this.localStorageService.tokenPayload.id).subscribe((x: string[]) => {
      x.forEach(element => {
        var place: any = this.getZipCodeLocation(element, this.getZipCode, this);
      });
    })

  }

  getZipCode(zipCode: string, place: any, self: any) {
    var found = false;
    for (var i = 0; i < self.zipCodes.length; i++) {
      if (self.zipCodes[i][0] === zipCode) {
        found = true;
        break;
      }
    }

    if (!found) {
      self.zipCodes.push([
        zipCode,
        place.geometry.location.lat,
        place.geometry.location.lng
      ]);
      self.placeMarker(zipCode, place);
    }
  }
}
