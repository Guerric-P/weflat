import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MatHorizontalStepper } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { CdkStep } from '@angular/cdk/stepper';
import { DisabledZipCodePopupComponent } from '../disabled-zip-code-popup/disabled-zip-code-popup.component';
import { SessionStorageService } from '../../services/session-storage.service';
import { VisitService } from '../../../shared/services/visit.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CreateVisitGuard } from '../../guards/create-visit.guard';
import { Router, ActivatedRoute } from '@angular/router';
import { AcheteurService } from '../../../shared/services/acheteur.service';
import { GooglePlaceKeys } from '../../../shared/common/GooglePlaceKeys';
import { VisitClass } from '../../models/VisitClass';
import { ZipCodeClass } from '../../models/ZipCodeClass';
import { CustomerClass } from '../../models/CustomerClass';
import { DatePipe } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { values } from '../../../shared/common/TimeDropDownValues';
import { GoogleService } from '../../services/google.service';
declare var google;

@Component({
  selector: 'app-create-visit',
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.scss']
})
export class CreateVisitComponent implements OnInit, AfterViewInit {

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
  visit: VisitClass = new VisitClass();
  place: any;
  price: number;

  times = values;

  minDate = moment().add(1, 'days').toDate();

  get visitCreationComplete(): boolean {
    return this.visit && this.visit.isComplete;
  }

  get architectsAvailable(): boolean {
    return this.visit && this.visit.zipCode && this.visit.zipCode.active;
  }

  constructor(
    public authService: AuthenticationService,
    private ref: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    private sessionStorageService: SessionStorageService,
    private visiteService: VisitService,
    private notificationService: NotificationsService,
    private createVisitGuard: CreateVisitGuard,
    private router: Router,
    private route: ActivatedRoute,
    private acheteurService: AcheteurService,
    private breakpointObserver: BreakpointObserver,
    private googleService: GoogleService,
    private zone: NgZone) { }

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 767px)');
  }

  ngOnInit() {
    if (this.sessionStorageService.place) {
      this.place = this.sessionStorageService.place;
      this.sessionStorageService.place = undefined;
    }

    if (this.sessionStorageService.visit) {
      this.visit = this.sessionStorageService.visit;
      this.sessionStorageService.visit = undefined;
    }

    this.displaySignupStep = !this.authService.isLoggedIn;

    this.authService.userLoggedIn.subscribe(res => {
      this.createVisitGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot);
      this.displaySignupStep = false;
    });

    this.authService.userLoggedOut.subscribe(res => {
      this.displaySignupStep = true;

      // If the selected step was above signin, return to signin step
      if (this.stepper.selectedIndex > 1) {
        this.stepper.selectedIndex = 1;
      }
    });

    const options = {
      types: ['address'],
      componentRestrictions: {
        country: 'fr'
      }
    };

    this.googleService.loadGoogleMapsLibrary().subscribe(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, options);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.place = autocomplete.getPlace();
        this.displayAddressComponents();
        this.placeMarker();
        this.loadVisit();
        this.completeVisitCreation(true);
      });
    });


    this.dateFormGroup = this._formBuilder.group({
      datePicker: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.addressFormGroup = this._formBuilder.group({
      addressInput: ['', Validators.required],
      streetNumber: [{ value: '', disabled: true }],
      route: [{ value: '', disabled: true }, Validators.required],
      zipCode: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required]
    });

    this.projectFormGroup = this._formBuilder.group({
      project: ['', Validators.required],
      announcementUrl: ['', [Validators.pattern(/^(http|https):\/\/[^ "]+$/)]]
    });

    this.dateFormGroup.valueChanges.subscribe(() => {
      this.loadVisit();
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

    this.visiteService.getPrice().subscribe(res => {
      res.subscribe(x => {
        this.price = x;
      });
    });

    this.adapter.setLocale('fr');
  }

  get formattedVisitDate() {
    if (this.visit && this.visit.visiteDate && !isNaN(this.visit.visiteDate.getTime())) {
      return new DatePipe('fr').transform(this.visit.visiteDate, 'medium');
    }
  }

  ngAfterViewInit(): void {
    this.googleService.loadGoogleMapsLibrary().subscribe(() => {
      if (!this.map) {
        this.map = new google.maps.Map(this.googleMap.nativeElement, {
          zoom: 10,
          center: new google.maps.LatLng(45.767519, 4.832526)
        });
      }

      if (this.place) {
        this.placeMarker();
      }
    });
  }

  get isVisitFilled(): boolean {
    return !!(this.visit.visiteDate && this.visit.route && this.visit.city && this.visit.zipCode);
  }

  displayAddressComponents() {
    const keys = Object.keys(GooglePlaceKeys);

    for (const key of keys) {
      this.addressFormGroup.controls[key].setValue(undefined);

      for (const component of this.place.address_components) {
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
    this.visit.zipCode = this.addressFormGroup.controls['zipCode'].value
      ? new ZipCodeClass({ number: this.addressFormGroup.controls['zipCode'].value }) : null;
    this.visit.announcementUrl = this.projectFormGroup.controls['announcementUrl'].value;

    const date = <Date>this.dateFormGroup.controls['datePicker'].value;
    const hour = this.dateFormGroup.controls['time'].value ? this.times[this.dateFormGroup.controls['time'].value].hour : null;
    const minute = this.dateFormGroup.controls['time'].value ? this.times[this.dateFormGroup.controls['time'].value].minute : null;

    this.visit.visiteDate = date ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute) : null;
  }

  async postNewVisit(enablePopup: boolean) {
    return new Promise((resolve, reject) => {
      this.loadVisit();
      if (this.isVisitFilled) {
        this.visiteService.post(this.visit).subscribe(res => {
          this.visit = res;
          if (!this.architectsAvailable && enablePopup) {
            this.popup.open(this.visit);
          }
          resolve();
        }, () => {
          this.notificationService.error('Erreur', 'Un problème est survenu lors de la création de la visite.');
          reject();
        });
      }
    });
  }

  paymentDone() {
    this.router.navigate(['/acheteur']);
  }

  selectionChanged(event: StepperSelectionEvent) {
    if (event.selectedStep === this.projectStep) {
      this.acheteurService.getAcheteur(this.authService.userId).subscribe(res => {
        this.projectFormGroup.controls['project'].setValue(res.project);
      });
    }
    if (event.previouslySelectedStep === this.projectStep) {
      this.acheteurService.patchAcheteur(
        new CustomerClass(
          {
            project: this.projectFormGroup.controls['project'].value
          }
        ), this.authService.userId
      ).subscribe(res => {
        // TODO
      }, err => {
        // TODO
      });
    }
    if (event.selectedStep === this.locationStep && !(this.architectsAvailable && this.visitCreationComplete)) {
      this.completeVisitCreation(false);
    }
    if (event.selectedStep === this.paymentStep) {
      // Second event to skip the previous value and get the fresh one
      this.completeVisitCreation(true);
    }
  }

  completeVisitCreation(enablePopup: boolean) {
    this.zone.run(() => {
      if (!this.visit.id) {
        this.postNewVisit(enablePopup);
      } else {
        this.visiteService.patch(this.visit, this.visit.id).subscribe(res => {
          this.visit = res;
          if (!this.architectsAvailable && enablePopup) {
            this.popup.open(this.visit);
          }
        }, err => {

        });
      }
    });
  }
}
