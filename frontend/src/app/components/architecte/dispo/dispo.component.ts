import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('zipCodeInput') zipCodeInput: ElementRef;
  index: number = 0;
  zipCodes = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER];
  map: any;
  markers: any = {};
  northeast: any;
  southwest: any;

  ngOnInit() {

    this.zipCodes = this.route.snapshot.data['zipCodes'];

    if (!this.map) {
      this.map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 10,
        center: new google.maps.LatLng(45.767519, 4.832526)
      });
    }

    this.getZipCodes();

    var options = {
      types: ['(regions)'],
      componentRestrictions: {
        country: 'fr'
      }
    };
    var self = this;
    var autocomplete = new google.maps.places.Autocomplete(this.zipCodeInput.nativeElement, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      if (place && place.address_components) {
        for (var i = 0; i < place.address_components.length; i++) {
          for (var j = 0; j < place.address_components[i].types.length; j++) {
            if (place.address_components[i].types[j] == "postal_code") {
              if ((place.address_components[i].long_name || '').trim()) {
                if (!self.markers[place.address_components[i].long_name.trim()]) {
                  self.loadZipCode(place.address_components[i].long_name.trim(), place, self);
                }
              }

              // Reset the input value
              if (self.zipCodeInput.nativeElement) {
                self.zipCodeInput.nativeElement.value = '';
              }
            }
          }
        }
      }
    })
  }

  placeMarker(zipCode: string, place: any, self: any, cb?: any) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
      map: self.map
    });

    self.markers[zipCode] = marker;

    self.fitBounds(place.geometry.viewport.getSouthWest().lat(),
      place.geometry.viewport.getSouthWest().lng(),
      place.geometry.viewport.getNorthEast().lat(),
      place.geometry.viewport.getNorthEast().lng(),
      self);

    google.maps.event.addListenerOnce(self.map, 'idle', function () {
      if (cb) {
        cb();
      }
    });

    self.computeBoundingRect();

    self.ref.detectChanges();
  }

  fitBounds(southwestLat?, southwestLng?, northeastLat?, northeastLng?, self?) {
    if (arguments.length === 0) {
      southwestLat = this.southwest.lat;
      southwestLng = this.southwest.lng;
      northeastLat = this.northeast.lat;
      northeastLng = this.northeast.lng;
    }

    let map = self && self.map || this.map;

    map.fitBounds(
      new google.maps.LatLngBounds(
        {
          lat: southwestLat,
          lng: southwestLng
        }, {
          lat: northeastLat,
          lng: northeastLng
        }
      )
    )
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
    delete this.markers[zipCode];

    this.computeBoundingRect();

    this.ref.detectChanges();
  }

  submitZipCodes() {
    this.architecteService.postZipCodes(this.zipCodes, this.localStorageService.tokenPayload.id).subscribe(x => {
      this.notificationService.success('Succès', 'Vos codes postaux ont bien été enregistrés.');
    }, err => {
      this.notificationService.error('Aïe', 'Un problème est survenu pendant l\'enregistrement de vos codes postaux...');
    });
  }

  getZipCodeLocation(zipCode: string, self: any, cb: any) {
    new google.maps.Geocoder().geocode({ 'address': zipCode, 'region': 'fr' }, function (results, status) {
      if (status == 'OK') {
        return self.placeMarker(zipCode, results[0], self, cb);
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  getZipCodes() {
    var self = this;
    this.zipCodes.forEach(element => {
      var place: any = this.getZipCodeLocation(element, this, function () {
        if (self.southwest && self.northeast && (self.southwest.lat !== self.northeast.lat || self.southwest.lng !== self.northeast.lng)) {
          self.fitBounds(self.southwest.lat, self.southwest.lng, self.northeast.lat, self.northeast.lng, self);
        }
      });
    });
  }

  loadZipCode(zipCode: string, place: any, self: any) {
    self.zipCodes.push(zipCode);
    self.placeMarker(zipCode, place, self);
  }

  computeBoundingRect() {
    let keys = Object.keys(this.markers);
    this.northeast = undefined;
    this.southwest = undefined;

    for (let key of keys) {
      let lat = this.markers[key].position.lat();
      let lng = this.markers[key].position.lng();

      if (this.northeast === undefined) {
        this.northeast = { lat: lat, lng: lng };
      }
      if (this.southwest === undefined) {
        this.southwest = { lat: lat, lng: lng };
      }
      if (this.northeast.lat < lat) {
        this.northeast.lat = lat;
      }
      if (this.northeast.lng < lng) {
        this.northeast.lng = lng;
      }
      if (this.southwest.lat > lat) {
        this.southwest.lat = lat;
      }
      if (this.southwest.lng > lng) {
        this.southwest.lng = lng;
      }
    }
  }
}
