import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, NgZone } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { ArchitectService } from '../../../shared/services/architecte.service';
import { UserService } from '../../../shared/services/user.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ArchitectStatusEnum } from '../../../shared/common/enums/ArchitectStatusEnum';
import { ArchitectTypeClass } from '../../../core/models/ArchitectTypeClass';
import { ArchitectSituationClass } from '../../../core/models/ArchitectSituationClass';
import { ArchitectClass } from '../../../core/models/ArchitectClass';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, ErrorStateMatcher, MatChipList, MatAutocompleteSelectedEvent } from '@angular/material';
import { ZipCodeClass } from '../../../core/models/ZipCodeClass';
import * as IBAN from 'iban';
import { PaymentTypeClass } from '../../../core/models/PaymentTypeClass';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GoogleService } from '../../../core/services/google.service';
import * as arrayUtils from '../../../core/utils/arrayUtils';
import { ZipCodeService } from '../../../shared/services/zip-code.service';
declare var moment;
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
  @ViewChild('googleMap') googleMap: ElementRef;
  @ViewChild('zipCodeInput') zipCodeInput: ElementRef;
  @ViewChild('zipCodesList') zipCodesList: MatChipList;
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
      let sanitizedZipCode = Object.assign({}, x);
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

    this.zipCodes[arrayUtils.findIndexById(this.zipCodes)(zipCode.id)].marker.setMap(null);

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
    for (let zipCode of this.zipCodes) {
      this.placeMarker(zipCode);
    }

    this.map.fitBounds(this.bounds);
  }

  loadZipCode(number: string) {
    this.zipCodeService.getZipCodesdetails([new ZipCodeClass({ number })]).subscribe(res => {

      let zipCode = res[0];
      this.zipCodes.push(zipCode);
      this.placeMarker(zipCode);
      this.map.fitBounds(this.bounds);
    });
  }

  loadMultipleZipCodes(number: string) {
    this.zipCodeService.searchZipCodes(number).subscribe(res => {
      const filteredZipCodes = res.filter(x => !this.zipCodes.find(y => y.number === x.number));

      for (let zipCode of filteredZipCodes) {
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
            }
            else if (event.target.value.match(/^[0-9]{3,4}$/)) {
              this.autocompletePredictions.unshift({
                structured_formatting: {
                  main_text: event.target.value
                },
                description: 'Commence par ' + event.target.value
              });
            }
          }
          else {
            this.autocompletePredictions = [];
          }
        });
      });
    }
    else {
      this.autocompletePredictions = [];
    }
  }

  zipCodeSelected(event: MatAutocompleteSelectedEvent) {

    // zip code
    if (event.option.value.length === 5 && !this.zipCodes.find(x => x.number === event.option.value)) {
      this.loadZipCode(event.option.value);
    }
    // county
    else if (event.option.value.length >= 2) {
      this.loadMultipleZipCodes(event.option.value);
    }

    this.zipCodeInput.nativeElement.value = '';
  }

  removeCountyClick(event: MouseEvent, county: string) {
    this.zipCodes.filter(x => x.number.substring(0, 2) === county).map(y => this.remove(y));
    event.stopPropagation();
  }
}
