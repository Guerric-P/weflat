import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ArchitecteService } from 'app/services/architecte.service';
import { LocalStorageService } from 'app/services/local-storage.service';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-dispo',
  templateUrl: './dispo.component.html',
  styleUrls: ['./dispo.component.css']
})
export class DispoComponent implements OnInit {

  constructor(
    private ref: ChangeDetectorRef,
    private architecteService: ArchitecteService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute) { }

  index: number = 0;
  zipCodes = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER];
  map: any;
  markers: any = {};
  notificationOptions: any = {
    timeOut: 5000
  }

  drawMap() {

  };

  ngOnInit() {

    this.zipCodes = this.route.snapshot.data['zipCodes'];

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
                  self.setZipCode(place.address_components[i].long_name.trim(), place, self);
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

  placeMarker(zipCode: string, place: any, self: any) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
      map: self.map
    });

    self.markers[zipCode] = marker;

    self.map.fitBounds(new google.maps.LatLngBounds(
      {
        lat: place.geometry.viewport.getSouthWest().lat(),
        lng: place.geometry.viewport.getSouthWest().lng()
      }, {
        lat: place.geometry.viewport.getNorthEast().lat(),
        lng: place.geometry.viewport.getNorthEast().lng()
      }
    )
    )

    self.ref.detectChanges();
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

    this.markers[zipCode].setMap(null);

    this.ref.detectChanges();
  }

  submitZipCodes() {
    this.architecteService.postZipCodes(this.zipCodes, this.localStorageService.tokenPayload.id).subscribe(x => {
      this.notificationService.success('Succès', 'Vos codes postaux ont bien été enregistrés.');
    }, err => {
      this.notificationService.error('Aïe', 'Un problème est survenu pendant l\'enregistrement de vos codes postaux...');
    });
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
    this.zipCodes.forEach(element => {
      var place: any = this.getZipCodeLocation(element, this.placeMarker, this);
    });
  }

  setZipCode(zipCode: string, place: any, self: any) {

    self.zipCodes.push(zipCode);
    self.placeMarker(zipCode, place, self);
  }
}
