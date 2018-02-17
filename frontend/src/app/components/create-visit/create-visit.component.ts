import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MatHorizontalStepper } from '@angular/material';
import { SessionStorageService } from 'app/services/session-storage.service';
import { VisiteService } from 'app/services/visite.service';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { VisiteClass } from 'app/models/visiteclass';
import { AuthenticationService } from 'app/services/authentication.service';
import { CreateVisitGuard } from 'app/guards/create-visit.guard';
import { Router, ActivatedRoute } from '@angular/router';
import { ZipCodeClass } from 'app/models/ZipCodeClass';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { CdkStep } from '@angular/cdk/stepper';
import { AcheteurService } from 'app/services/acheteur.service';
import { GooglePlaceKeys } from 'app/common/GooglePlaceKeys';

declare var google;

@Component({
  selector: 'app-create-visit',
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.css']
})
export class CreateVisitComponent implements OnInit {

  isLinear = true;
  dateFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  projectFormGroup: FormGroup;
  map: any;
  marker: any;
  @ViewChild('googleMap') googleMap: ElementRef;
  @ViewChild('addressInput') addressInput: ElementRef;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  @ViewChild('projectStep') projectStep: CdkStep;
  @ViewChild('paymentStep') paymentStep: CdkStep;
  @ViewChild('locationStep') locationStep: CdkStep;
  displaySignupStep: boolean;
  visit: VisiteClass = new VisiteClass();
  place: any;
  payButtonDisabled: boolean = true;

  constructor(private ref: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    private sessionStorageService: SessionStorageService,
    private visiteService: VisiteService,
    private notificationService: NotificationsService,
    private authService: AuthenticationService,
    private createVisitGuard: CreateVisitGuard,
    private router: Router,
    private route: ActivatedRoute,
    private acheteurService: AcheteurService) { }

  ngOnInit() {
    this.place = this.sessionStorageService.place;
    this.sessionStorageService.place = undefined;

    this.visit = this.sessionStorageService.visit;
    this.sessionStorageService.visit = undefined;

    this.displaySignupStep = !this.authService.isLoggedIn();

    this.authService.userLoggedIn().subscribe(res => {
      this.createVisitGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot);
      this.displaySignupStep = false;
    });

    this.authService.userLoggedOut().subscribe(res => {
      this.displaySignupStep = true;

      //If the selected step was above signin, return to signin step
      if (this.stepper.selectedIndex > 1) {
        this.stepper.selectedIndex = 1;
      }
    });

    var options = {
      types: ['address'],
      componentRestrictions: {
        country: 'fr'
      }
    };

    var autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      this.place = autocomplete.getPlace();
      this.displayAddressComponents.bind(this)();
      this.placeMarker.bind(this)()
    }.bind(this));

    this.dateFormGroup = this._formBuilder.group({
      datePicker: ['', Validators.required]
    });

    this.addressFormGroup = this._formBuilder.group({
      addressInput: ['', Validators.required],
      streetNumber: [{ value: '', disabled: true }, Validators.required],
      route: [{ value: '', disabled: true }, Validators.required],
      zipCode: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required]
    });

    //this.projectFormGroup = this._formBuilder.group();

    if (this.place) {
      this.displayAddressComponents();
      this.addressFormGroup.controls['addressInput'].setValue(this.place.formatted_address);
    }

    this.adapter.setLocale('fr');
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.map = new google.maps.Map(this.googleMap.nativeElement, {
        zoom: 10,
        center: new google.maps.LatLng(45.767519, 4.832526)
      });
    }

    if (this.place) {
      this.placeMarker();
    }
  }

  displayAddressComponents() {
    let keys = Object.keys(GooglePlaceKeys);

    for (let key of keys) {
      for (let component of this.place.address_components) {
        if (component.types.includes(GooglePlaceKeys[key])) {
          this.addressFormGroup.controls[key].setValue(component.long_name);
        }
      }
    }

    this.ref.detectChanges();
  }

  placeMarker() {
    if (this.marker) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.place.geometry.location.lat(), this.place.geometry.location.lng()),
      map: this.map
    });

    this.map.setCenter(this.place.geometry.location);
    this.map.setZoom(16);
  }

  postVisit() {
    let visite = new VisiteClass();
    visite.city = this.addressFormGroup.controls['city'].value;
    visite.route = this.addressFormGroup.controls['route'].value;
    visite.streetNumber = this.addressFormGroup.controls['streetNumber'].value;
    visite.zipCode = new ZipCodeClass({ number: this.addressFormGroup.controls['zipCode'].value });
    visite.visiteDate = moment(this.dateFormGroup.controls['datePicker'].value).toDate();
    this.visiteService.post(visite).subscribe(res => {
      this.visit.id = res.visitId;
    }, err => {
      this.notificationService.error('Erreur', 'Un problème est survenu lors de la création de la visite.');
    });
  }

  openStripePopup() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_EJlsBsLshUf7TNnB2ITpQ7sB',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      zipCode: true,
      currency: 'eur',
      token: function (token: any) {
        this.visiteService.pay(this.visit.id, token.id).subscribe(res => {
          this.notificationService.success('Paiement effectué', 'Le paiement a réussi pour votre création de visite.');
          this.router.navigate(['/acheteur']);
        });
      }.bind(this)
    });

    handler.open({
      name: 'Weflat',
      description: 'Règlement de la prestation',
      amount: 15000
    });

  }

  selectionChanged(event: StepperSelectionEvent) {
    if (event.selectedStep == this.locationStep) {
      if (!this.visit.id) {
        this.postVisit();
      }
      /*this.acheteurService.getAcheteur().subscribe(res => {
        if(res.project) {
          this.projectFormGroup = this._formBuilder.group({
            announcementUrl: ['', Validators.required],
          });
        }
        else {
          this.projectFormGroup = this._formBuilder.group({
            project: ['', Validators.required],
            announcementUrl: ['', Validators.required],
          });
        }
      });*/
    }
    if (event.selectedStep == this.paymentStep) {
      this.visiteService.completeCreation(this.visit).subscribe(res => {
        this.payButtonDisabled = false;
      });
    }
  }
}
