import { Component, OnInit, ViewChild, ElementRef, NgZone, TemplateRef } from '@angular/core';
import { SessionStorageService } from 'app/services/session-storage.service';
import { Router } from '@angular/router';
import { VisiteService } from 'app/services/visite.service';
import { GooglePlaceKeys } from 'app/common/GooglePlaceKeys';
import { VisiteClass } from 'app/models/visiteclass';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ZipCodeClass } from 'app/models/ZipCodeClass';

declare var google: any;

@Component({
  selector: 'app-address-field',
  templateUrl: './address-field.component.html',
  styleUrls: ['./address-field.component.css']
})
export class AddressFieldComponent implements OnInit {

  constructor(private sessionStorageService: SessionStorageService,
    private router: Router,
    private zone: NgZone,
    private visitService: VisiteService,
    private modalService: NgbModal) { }

  noArchitectsModal: NgbModalRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('noArchitectsModal') noArchitectsModalTemplate: TemplateRef<any>;
  visit: VisiteClass = new VisiteClass();
  place: any;

  ngOnInit() {
    var options = {
      types: ['address'],
      componentRestrictions: {
        country: 'fr'
      }
    };
    var autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      this.placeChanged(autocomplete);
    }.bind(this));
  }

  placeChanged(autocomplete) {
    this.zone.run(() => {
      this.place = autocomplete.getPlace();
      this.sessionStorageService.place = this.place;
      let keys = Object.keys(GooglePlaceKeys);

      for (let key of keys) {
        for (let component of this.place.address_components) {
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
        if (!res.architectsAvailable) {
          this.noArchitectsModal = this.modalService.open(this.noArchitectsModalTemplate);

          this.noArchitectsModal.result.then((result) => {
            this.sessionStorageService.place = this.place;
            this.sessionStorageService.visit = this.visit;
            this.router.navigate(['/create-visit']);
          }, (reason) => {
            (this.input.nativeElement as HTMLInputElement).value = null;
          });
        }
        else {
          this.visit.id = res.visitId;
          this.sessionStorageService.visit = this.visit;
          this.router.navigate(['/create-visit']);
        }
      });
    });

  }

}
