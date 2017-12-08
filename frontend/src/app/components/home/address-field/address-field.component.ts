import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { SessionStorageService } from 'app/services/session-storage.service';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-address-field',
  templateUrl: './address-field.component.html',
  styleUrls: ['./address-field.component.css']
})
export class AddressFieldComponent implements OnInit {

  constructor(private sessionStorageService: SessionStorageService, private router: Router, private zone:NgZone) { }

  @ViewChild('input') input: ElementRef;

  ngOnInit() {
    var options = {
      types: ['address'],
      componentRestrictions: {
        country: 'fr'
      }
    };
    var self = this;
    var autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      self.sessionStorageService.place = place;
      self.zone.run(() => {
        self.router.navigate(['/acheteur']);
      });
    })
  }

}
