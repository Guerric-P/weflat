import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ArchitecteService } from 'app/services/architecte.service';
import { LocalStorageService } from 'app/services/local-storage.service';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ZipCodeClass } from 'app/models/ZipCodeClass';

declare var google: any;

@Component({
  selector: 'app-dispo',
  templateUrl: './dispo.component.html',
  styleUrls: ['./dispo.component.css']
})
export class DispoComponent implements OnInit, AfterViewInit {

  constructor(
    private ref: ChangeDetectorRef,
    private architecteService: ArchitecteService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute) { }

  @ViewChild('zipCodeInput') zipCodeInput: ElementRef;
  @ViewChild('googleMap') googleMap: ElementRef;
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

    this.zipCodes = this.route.snapshot.data['zipCodes'].map(x => x.number);

    var options = {
      types: ['(regions)'],
      componentRestrictions: {
        country: 'fr'
      }
    };

    var autocomplete = new google.maps.places.Autocomplete(this.zipCodeInput.nativeElement, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      if (place && place.address_components) {
        for (var i = 0; i < place.address_components.length; i++) {
          for (var j = 0; j < place.address_components[i].types.length; j++) {
            if (place.address_components[i].types[j] == "postal_code") {
              if ((place.address_components[i].long_name || '').trim()) {
                if (!this.markers[place.address_components[i].long_name.trim()]) {
                  this.loadZipCode(place.address_components[i].long_name.trim(), place);
                }
              }

              // Reset the input value
              if (this.zipCodeInput.nativeElement) {
                this.zipCodeInput.nativeElement.value = '';
              }
            }
          }
        }
      }
    }.bind(this))
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.map = new google.maps.Map(this.googleMap.nativeElement, {
        zoom: 10,
        center: new google.maps.LatLng(45.767519, 4.832526)
      });
    }

    this.getZipCodes();
  }

  placeMarker(zipCode: string, place: any, cb?: any) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
      map: this.map
    });

    this.markers[zipCode] = marker;

    this.fitBounds(place.geometry.viewport.getSouthWest().lat(),
      place.geometry.viewport.getSouthWest().lng(),
      place.geometry.viewport.getNorthEast().lat(),
      place.geometry.viewport.getNorthEast().lng());

    google.maps.event.addListenerOnce(this.map, 'idle', function () {
      if (cb) {
        cb();
      }
    });

    this.computeBoundingRect();

    this.ref.detectChanges();
  }

  fitBounds(southwestLat?, southwestLng?, northeastLat?, northeastLng?) {
    if (arguments.length === 0) {
      southwestLat = this.southwest.lat;
      southwestLng = this.southwest.lng;
      northeastLat = this.northeast.lat;
      northeastLng = this.northeast.lng;
    }

    let map = this && this.map || this.map;

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
    let zipCodes: ZipCodeClass[] = new Array<ZipCodeClass>();

    for(let zipCode of this.zipCodes) {
      zipCodes.push({number: zipCode});
    }

    this.architecteService.postZipCodes(zipCodes, this.localStorageService.tokenPayload.id).subscribe(x => {
      this.notificationService.success('Succès', 'Vos codes postaux ont bien été enregistrés.');
    }, err => {
      this.notificationService.error('Aïe', 'Un problème est survenu pendant l\'enregistrement de vos codes postaux...');
    });
  }

  getZipCodeLocation(zipCode: string, cb: any) {
    new google.maps.Geocoder().geocode({ 'address': zipCode, 'region': 'fr' }, function (results, status) {
      if (status == 'OK') {
        return this.placeMarker(zipCode, results[0], cb);
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }.bind(this));
  }

  getZipCodes() {
    this.zipCodes.forEach(element => {
      var place: any = this.getZipCodeLocation(element, function () {
        if (this.southwest && this.northeast && (this.southwest.lat !== this.northeast.lat || this.southwest.lng !== this.northeast.lng)) {
          this.fitBounds(this.southwest.lat, this.southwest.lng, this.northeast.lat, this.northeast.lng, this);
        }
      }.bind(this));
    });
  }

  loadZipCode(zipCode: string, place: any) {
    this.zipCodes.push(zipCode);
    this.placeMarker(zipCode, place);
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
