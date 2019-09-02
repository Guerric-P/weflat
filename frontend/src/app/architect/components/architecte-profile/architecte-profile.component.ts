import { ENTER } from '@angular/cdk/keycodes';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatAutocompleteSelectedEvent, MatChipList } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ArchitectClass } from '@weflat/core/models/ArchitectClass';
import { ArchitectSituationClass } from '@weflat/core/models/ArchitectSituationClass';
import { ArchitectTypeClass } from '@weflat/core/models/ArchitectTypeClass';
import { PaymentTypeClass } from '@weflat/core/models/PaymentTypeClass';
import { ZipCodeClass } from '@weflat/core/models/ZipCodeClass';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { GoogleService } from '@weflat/core/services/google.service';
import { findIndexById } from '@weflat/core/utils/arrayUtils';
import { ArchitectStatusEnum } from '@weflat/shared/common/enums/ArchitectStatusEnum';
import { ArchitectService } from '@weflat/shared/services/architecte.service';
import { UserService } from '@weflat/shared/services/user.service';
import { ZipCodeService } from '@weflat/shared/services/zip-code.service';
import { NotificationsService } from 'angular2-notifications';
import * as IBAN from 'iban';
import * as moment from 'moment';

declare var google;

@Component({
  selector: 'app-architecte-profile',
  templateUrl: './architecte-profile.component.html',
  styleUrls: ['./architecte-profile.component.scss']
})
export class ArchitecteProfileComponent implements OnInit, AfterViewInit {


  form: FormGroup;
  passwordForm: FormGroup;
  architectTypes: ArchitectTypeClass[];
  architectSituations: ArchitectSituationClass[];
  paymentTypes: PaymentTypeClass[];
  architecte: ArchitectClass;
  dateNow = moment().format('YYYY-MM-DD');
  @ViewChild('googleMap', { static: true }) googleMap: ElementRef;
  @ViewChild('zipCodeInput', { static: true }) zipCodeInput: ElementRef;
  @ViewChild('zipCodesList', { static: true }) zipCodesList: MatChipList;
  index = 0;
  zipCodes: ZipCodeClass[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes = [ENTER];
  map: any;
  bounds: any;
  autoCompleteService: any;
  autocompletePredictions: any[] = [];
  statusEmphasis: boolean;
  zipCodeInputValue: string;
  zipCodeErrorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean =>
      !this.zipCodes || !this.zipCodes.length
  }
  options: any = {
    types: ['(regions)'],
    componentRestrictions: {
      country: 'fr'
    }
  };
  public ArchitectStatusEnum = ArchitectStatusEnum;

  constructor(
    private fb: FormBuilder,
    private architecteService: ArchitectService,
    private notificationsService: NotificationsService,
    private googleService: GoogleService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private ref: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private zipCodeService: ZipCodeService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.architecte = this.route.snapshot.data['architecte'];
    this.architectTypes = this.route.snapshot.data['architectTypes'];
    this.architectSituations = this.route.snapshot.data['architectSituations'];
    this.paymentTypes = this.route.snapshot.data['paymentTypes'];

    this.initForm();

    this.passwordForm = this.fb.group({
      password: [null, Validators.minLength(6)]
    });

    this.zipCodes = this.route.snapshot.data['zipCodes'];

    this.googleService.loadGoogleMapsLibrary().subscribe(() => {
      this.autoCompleteService = new google.maps.places.AutocompleteService()
    });
  }

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 767px)');
  }

  get disabledZipCodes() {
    return this.zipCodes.filter(x => !x.active);
  }

  get serializableZipCodes() {
    return this.zipCodes.map(x => {
      const sanitizedZipCode = Object.assign({}, x);
      delete sanitizedZipCode.marker;
      return sanitizedZipCode;
    })
  }

  get sortedZipCodes() {
    return this.zipCodes.reduce((accumulator, currentValue) => {
      (accumulator[currentValue.number.substring(0, 2)] || (accumulator[currentValue.number.substring(0, 2)] = [])).push(currentValue);
      return accumulator;
    }, {});
  }

  get filteredAutoCompletePredictions() {
    return this.autocompletePredictions.filter(x => !x.types || x.types.includes('postal_code'));
  }

  fitBounds() {
    this.map.fitBounds(this.bounds);
  }

  onZipCodeInputBlur(event: any) {
    event.target.value = '';
  }

  initForm() {
    this.form = this.fb.group({
      firstName: [this.architecte.firstName, Validators.required],
      lastName: [this.architecte.lastName, Validators.required],
      birthDate: [this.architecte.birthDate && moment(this.architecte.birthDate).format('YYYY-MM-DD'), Validators.required],
      email: [{ value: this.architecte.email, disabled: true }, [Validators.required, Validators.email]],
      telephone: [this.architecte.telephone, [Validators.required, Validators.pattern(/0(6|7)\d{8}/)]],
      type: [this.architecte.type && this.architecte.type.id, Validators.required],
      situation: [this.architecte.situation && this.architecte.situation.id, Validators.required],
      practicingSince: [
        this.architecte.practicingSince && moment(this.architecte.practicingSince).format('YYYY-MM-DD'),
        Validators.required
      ],
      webSite: [this.architecte.webSite, Validators.pattern(/^(http|https):\/\/[^ "]+$/)],
      architectsOrder: [this.architecte.architectsOrder, Validators.required],
      paymentType: [this.architecte.paymentType && this.architecte.paymentType.id, Validators.required],
      cfai: [this.architecte.cfai, Validators.required],
      professionalResponsibility: [this.architecte.professionalResponsibility, Validators.required],
      decennialInsurance: [this.architecte.decennialInsurance, Validators.required],
      motivation: [this.architecte.motivation, Validators.required],
      cgu: [this.architecte.cgu, Validators.requiredTrue],
      iban: [
        this.architecte.iban ? IBAN.printFormat(this.architecte.iban) : null,
        [this.requiredIfPaymentTypeIsIBAN('paymentType'), this.IBANValidator]
      ]
    });
  }

  requiredIfPaymentTypeIsIBAN(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function (control: FormControl) {
      if (!control.parent) {
        return null;
      }
      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        // Get the other control from the parent
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        // If other control change, we must compute again the validity
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }
      if (!otherControl) {
        return null;
      }
      // If "Transfert bancaire"
      return (otherControl.value === '2' && !thisControl.value) ? { verifyIBANFailed: true } : null;
    }
  }

  ngAfterViewInit(): void {
    this.googleService.loadGoogleMapsLibrary().subscribe(() => {
      this.map = new google.maps.Map(this.googleMap.nativeElement, {
        zoom: 10,
        center: new google.maps.LatLng(45.767519, 4.832526)
      });

      this.bounds = new google.maps.LatLngBounds();

      this.placeZipCodes();
    });
  }

  get formattedDisabledZipCodes() {
    return this.disabledZipCodes.map(x => x.number).join(', ');
  }

  isChipWarning(zipCode: ZipCodeClass): boolean {
    return !!this.disabledZipCodes.find(x => x === zipCode);
  }

  addMarkerToZipCode(zipCode: ZipCodeClass) {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(zipCode.latitude, zipCode.longitude),
      map: this.map
    });

    zipCode.marker = marker;
  }

  placeMarker(zipCode: ZipCodeClass) {

    this.addMarkerToZipCode(zipCode);
    this.bounds.extend(zipCode.marker.position);

    this.ref.detectChanges();
  }

  remove(zipCode: ZipCodeClass): void {

    this.zipCodes[findIndexById(this.zipCodes)(zipCode.id)].marker.setMap(null);

    const index = this.zipCodes.indexOf(zipCode);

    if (index >= 0) {
      this.zipCodes.splice(index, 1);
    }

    this.ref.detectChanges();
  }

  /*getZipCodeLocation(zipCode: string, cb: any) {
    new google.maps.Geocoder().geocode({ 'address': zipCode, 'region': 'fr' }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        return this.placeMarker(zipCode, results[0], cb);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }*/

  placeZipCodes() {
    for (const zipCode of this.zipCodes) {
      this.placeMarker(zipCode);
    }

    this.map.fitBounds(this.bounds);
  }

  loadZipCode(number: string) {
    this.zipCodeService.getZipCodesdetails([new ZipCodeClass({ number })]).subscribe(res => {

      const zipCode = res[0];
      this.zipCodes.push(zipCode);
      this.placeMarker(zipCode);
      this.map.fitBounds(this.bounds);
    });
  }

  loadMultipleZipCodes(number: string) {
    this.zipCodeService.searchZipCodes(number).subscribe(res => {
      const filteredZipCodes = res.filter(x => !this.zipCodes.find(y => y.number === x.number));

      for (const zipCode of filteredZipCodes) {
        this.zipCodes.push(zipCode);
        this.placeMarker(zipCode);
      }
      this.map.fitBounds(this.bounds);
    });
  }

  onSubmit() {
    const formModel = this.form.value;

    if (!this.form.invalid && this.zipCodesList.chips && this.zipCodesList.chips.length) {

      const architect = new ArchitectClass({
        firstName: formModel.firstName,
        lastName: formModel.lastName,
        birthDate: formModel.birthDate,
        telephone: formModel.telephone,
        type: new ArchitectTypeClass({ id: formModel.type }),
        situation: new ArchitectSituationClass({ id: formModel.situation }),
        paymentType: new PaymentTypeClass({ id: formModel.paymentType }),
        practicingSince: new Date(formModel.practicingSince),
        webSite: formModel.webSite,
        architectsOrder: formModel.architectsOrder,
        cfai: formModel.cfai,
        professionalResponsibility: formModel.professionalResponsibility,
        decennialInsurance: formModel.decennialInsurance,
        motivation: formModel.motivation,
        cgu: formModel.cgu,
        iban: formModel.iban ? IBAN.electronicFormat(formModel.iban) : null,
        zipCodes: this.serializableZipCodes
      });

      this.architecteService.patchArchitecte(architect, this.authService.userId).subscribe(res => {
        if (this.architecte.status !== ArchitectStatusEnum.APPROVING && res.status === ArchitectStatusEnum.APPROVING) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.statusEmphasis = true;
        }
        this.architecte = res;
        this.notificationsService.success('Merci !', 'Vos informations ont été sauvegardées avec succès.');
      }, () => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors de l\'enregistrement de vos informations.');
      });
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.notificationsService.error('Oups !', 'Les données saisies sont erronées ou incomplètes.');
    }
  }

  changePassword(password: string, event?: KeyboardEvent) {
    if (event) { event.preventDefault(); }
    if (this.passwordForm.controls.password.value && this.passwordForm.valid) {
      this.userService.changePassword(this.architecte.id, password).subscribe(res => {
        this.notificationsService.success('Merci !', 'Votre mot de passe a été changé avec succès.');
      }, err => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors du changement de mot de passe.');
      });
    }
  }

  IBANValidator(c: AbstractControl): ValidationErrors | null {
    return IBAN.isValid(c.value) || !c.value ? null : {
      invalidIBAN: true
    }
  }

  zipCodeInputChanged(event: any) {
    if (event.target.value) {
      this.options.input = event.target.value;

      this.autoCompleteService.getPlacePredictions(this.options, (result, status) => {
        this.zone.run(() => {
          if (result) {
            this.autocompletePredictions = result;
            if (event.target.value.match(/^[0-9]{2}$/)) {
              this.autocompletePredictions.unshift({
                structured_formatting: {
                  main_text: event.target.value
                },
                description: 'Département ' + event.target.value
              });
            } else if (event.target.value.match(/^[0-9]{3,4}$/)) {
              this.autocompletePredictions.unshift({
                structured_formatting: {
                  main_text: event.target.value
                },
                description: 'Commence par ' + event.target.value
              });
            }
          } else {
            this.autocompletePredictions = [];
          }
        });
      });
    } else {
      this.autocompletePredictions = [];
    }
  }

  zipCodeSelected(event: MatAutocompleteSelectedEvent) {

    // zip code
    if (event.option.value.length === 5 && !this.zipCodes.find(x => x.number === event.option.value)) {
      this.loadZipCode(event.option.value);
    } else if (event.option.value.length >= 2) {
      this.loadMultipleZipCodes(event.option.value);
    }

    this.zipCodeInput.nativeElement.value = '';
  }

  removeCountyClick(event: MouseEvent, county: string) {
    this.zipCodes.filter(x => x.number.substring(0, 2) === county).map(y => this.remove(y));
    event.stopPropagation();
  }
}
