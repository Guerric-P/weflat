import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { ArchitecteService } from '../../../shared/services/architecte.service';
import { UserService } from '../../../shared/services/user.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ArchitectStatusEnum } from '../../../shared/common/enums/ArchitectStatusEnum';
import { ArchitectTypeClass } from '../../../core/models/ArchitectTypeClass';
import { ArchitectSituationClass } from '../../../core/models/ArchitectSituationClass';
import { ArchitecteClass } from '../../../core/models/ArchitecteClass';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ZipCodeClass } from '../../../core/models/ZipCodeClass';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ZipCodeService } from '../../../shared/services/zip-code.service';
declare var moment;
declare var google;

@Component({
  selector: 'app-architecte-profile',
  templateUrl: './architecte-profile.component.html',
  styleUrls: ['./architecte-profile.component.scss']
})
export class ArchitecteProfileComponent implements OnInit {


  form: FormGroup;
  architectTypes: ArchitectTypeClass[];
  architectSituations: ArchitectSituationClass[];
  architecte: ArchitecteClass;
  dateNow = moment().format('YYYY-MM-DD');
  @ViewChild('zipCodeInput') zipCodeInput: ElementRef;
  @ViewChild('googleMap') googleMap: ElementRef;
  index: number = 0;
  zipCodes = [];
  disabledZipCodes: string[];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER];
  map: any;
  markers: any = {};
  northeast: any;
  southwest: any;

  constructor(private fb: FormBuilder,
    private architecteService: ArchitecteService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private notificationService: NotificationsService,
    private localStorageService: LocalStorageService,
    private zipCodeService: ZipCodeService,
    private ref: ChangeDetectorRef,
    private zone: NgZone) { }


  public ArchitectStatusEnum = ArchitectStatusEnum;

  ngOnInit() {
    this.architecte = this.route.snapshot.data['architecte'];
    this.architectTypes = this.route.snapshot.data['architectTypes'];
    this.architectSituations = this.route.snapshot.data['architectSituations'];

    this.form = this.fb.group({
      firstName: [this.architecte.firstName, Validators.required],
      lastName: [this.architecte.lastName, Validators.required],
      birthDate: [this.architecte.birthDate && moment(this.architecte.birthDate).format('YYYY-MM-DD'), [Validators.required]],
      email: [{ value: this.architecte.email, disabled: true }, [Validators.required, Validators.email]],
      telephone: [this.architecte.telephone, [Validators.required, Validators.pattern(/0(6|7)\d{8}/)]],
      type: [this.architecte.type && this.architecte.type.id],
      situation: [this.architecte.situation && this.architecte.situation.id],
      practicingSince: [moment(this.architecte.practicingSince).format('YYYY-MM-DD')],
      webSite: [this.architecte.webSite, Validators.pattern(/^(http|https):\/\/[^ "]+$/)],
      architectsOrder: [this.architecte.architectsOrder],
      cfai: [this.architecte.cfai],
      professionalResponsibility: [this.architecte.professionalResponsibility],
      decennialInsurance: [this.architecte.decennialInsurance],
      motivation: [this.architecte.motivation],
      cgu: [this.architecte.cgu, Validators.requiredTrue]
    });

    this.zipCodes = this.route.snapshot.data['zipCodes'].map(x => x.number);
    this.disabledZipCodes = this.route.snapshot.data['zipCodes'].filter(x => !x.active).map(x => x.number);

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

  get formattedDisabledZipCodes() {
    return this.disabledZipCodes.join(', ');
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
      //Check zip codes status
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  checkZipCodesStatus() {
    this.zone.run(() => {
      this.zipCodeService.getZipCodesStatus(this.zipCodesArrayFromThis).subscribe(res => {
        this.disabledZipCodes = res.filter(x => !x.active).map(x => x.number);
      })
    });
  }

  remove(zipCode: any): void {
    let index = this.zipCodes.indexOf(zipCode);

    if (index >= 0) {
      this.zipCodes.splice(index, 1);
    }

    this.markers[zipCode].setMap(null);
    delete this.markers[zipCode];

    this.computeBoundingRect();

    this.checkZipCodesStatus();

    this.ref.detectChanges();
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
    this.checkZipCodesStatus();
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

  get zipCodesArrayFromThis() {
    const zipCodes: ZipCodeClass[] = new Array<ZipCodeClass>();

    for (let zipCode of this.zipCodes) {
      zipCodes.push(new ZipCodeClass({ number: zipCode }));
    }

    return zipCodes;
  }

  onSubmit() {
    const formModel = this.form.value;

    if (!this.form.invalid) {
      const zipCodes = this.zipCodesArrayFromThis;

      const architect = new ArchitecteClass({
        firstName: formModel.firstName,
        lastName: formModel.lastName,
        birthDate: formModel.birthDate,
        telephone: formModel.telephone,
        type: new ArchitectTypeClass({ id: formModel.type }),
        situation: new ArchitectSituationClass({ id: formModel.situation }),
        practicingSince: new Date(formModel.practicingSince),
        webSite: formModel.webSite,
        architectsOrder: formModel.architectsOrder,
        cfai: formModel.cfai,
        professionalResponsibility: formModel.professionalResponsibility,
        decennialInsurance: formModel.decennialInsurance,
        motivation: formModel.motivation,
        cgu: formModel.cgu,
        zipCodes: zipCodes
      });

      this.architecteService.patchArchitecte(architect, this.authService.userId).subscribe(res => {
        this.notificationsService.success('Merci !', 'Vos informations ont été sauvegardées avec succès.');
      }, err => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors de l\'enregistrement de vos informations.');
      });
    }
    else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.notificationsService.error('Oups !', 'Les données saisies sont erronées ou incomplètes.');
    }
  }

  changePassword(password: string, event?: KeyboardEvent) {
    if (event) event.preventDefault();
    this.userService.changePassword(password).subscribe(res => {
      this.notificationsService.success('Merci !', 'Votre mot de passe a été changé avec succès.');
    }, err => {
      this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors du changement de mot de passe.');
    });
  }
}
