import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
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
import { DisabledZipCodePopupComponent } from 'app/components/disabled-zip-code-popup/disabled-zip-code-popup.component';
import { AcheteurClass } from 'app/models/AcheteurClass';
import { environment } from '../../../environments/environment';

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
  @ViewChild('popup') popup: DisabledZipCodePopupComponent;
  displaySignupStep: boolean;
  visit: VisiteClass = new VisiteClass();
  place: any;
  visitCreationComplete: boolean = false;
  architectsAvailable: boolean = false;

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
    private acheteurService: AcheteurService,
    private zone: NgZone) { }

  ngOnInit() {
    if (this.sessionStorageService.place) {
      this.place = this.sessionStorageService.place;
      this.sessionStorageService.place = undefined;
    }

    if (this.sessionStorageService.visit) {
      this.visit = this.sessionStorageService.visit;
      this.sessionStorageService.visit = undefined;
    }

    if (this.sessionStorageService.visitInfos) {
      this.visitCreationComplete = this.sessionStorageService.visitInfos.visitCreationComplete;
      this.architectsAvailable = this.sessionStorageService.visitInfos.architectsAvailable;
    }

    this.displaySignupStep = !this.authService.isLoggedIn;

    this.authService.userLoggedIn.subscribe(res => {
      this.createVisitGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot);
      this.displaySignupStep = false;
    });

    this.authService.userLoggedOut.subscribe(res => {
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
      this.placeMarker.bind(this)();
      this.loadVisit.bind(this)();
      this.completeVisitCreation.bind(this)(true);
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

    this.projectFormGroup = this._formBuilder.group({
      project: ['', Validators.required],
      announcementUrl: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]]
    });

    this.projectFormGroup.valueChanges.subscribe(() => {
      this.loadVisit();
    });

    this.addressFormGroup.valueChanges.subscribe(() => {
      this.loadVisit();
    });

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

  loadVisit() {
    this.visit.city = this.addressFormGroup.controls['city'].value;
    this.visit.route = this.addressFormGroup.controls['route'].value;
    this.visit.streetNumber = this.addressFormGroup.controls['streetNumber'].value;
    this.visit.zipCode = new ZipCodeClass({ number: this.addressFormGroup.controls['zipCode'].value });
    this.visit.announcementUrl = this.projectFormGroup.controls['announcementUrl'].value;
    this.visit.visiteDate = moment(this.dateFormGroup.controls['datePicker'].value).toDate();
  }

  async postNewVisit(enablePopup: boolean) {
    return new Promise((resolve, reject) => {
      this.loadVisit();
      this.visiteService.post(this.visit).subscribe(res => {
        this.visit.id = res.visitId;
        this.visitCreationComplete = res.complete;
        this.architectsAvailable = res.architectsAvailable;
        if (!this.architectsAvailable && enablePopup) {
          this.popup.open(this.visit);
        }
        resolve();
      }, err => {
        this.visitCreationComplete = false;
        this.architectsAvailable = false;
        this.notificationService.error('Erreur', 'Un problème est survenu lors de la création de la visite.');
        reject();
      });
    });
  }

  paymentDone() {
    this.router.navigate(['/acheteur']);
  }

  selectionChanged(event: StepperSelectionEvent) {
    if (event.selectedStep == this.projectStep) {
      this.acheteurService.getAcheteur(this.authService.userId).subscribe(res => {
        this.projectFormGroup.controls['project'].setValue(res.project);
      });
    }
    if (event.previouslySelectedStep == this.projectStep) {
      this.acheteurService.patchAcheteur(
        new AcheteurClass(
          {
            project: this.projectFormGroup.controls['project'].value
          }
        ), this.authService.userId
      ).subscribe(res => {
        //TODO
      }, err => {
        //TODO
      });
    }
    if (event.selectedStep == this.locationStep && !(this.architectsAvailable && this.visitCreationComplete)) {
      this.completeVisitCreation(false);
    }
  }

  completeVisitCreation(enablePopup: boolean) {
    this.zone.run(() => {
      this.visitCreationComplete = false;
      if (!this.visit.id) {
        this.postNewVisit(enablePopup);
      }
      else {
        this.visiteService.completeCreation(this.visit).subscribe(res => {
          this.visitCreationComplete = res.complete;
          this.architectsAvailable = res.architectsAvailable;
          if (!this.architectsAvailable && enablePopup) {
            this.popup.open(this.visit);
          }
        }, err => {
          this.visitCreationComplete = false;
          this.architectsAvailable = false;
        });
      }
    });
  }
}
