import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ZipCodeClass } from '../../../../core/models/ZipCodeClass';
import { ZipCodeService } from '../../../../shared/services/zip-code.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-zip-codes',
  templateUrl: './zip-codes.component.html',
  styleUrls: ['./zip-codes.component.scss']
})
export class ZipCodesComponent implements OnInit {

  results: ZipCodeClass[];
  inputValue: string;
  matcher: ErrorStateMatcher = new ZipCodeErrorStateMatcher();

  constructor(
    private zipCodeService: ZipCodeService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.zipCodeService.searchZipCodes().subscribe(res => {
      this.results = res;
    });
  }

  onKeyUp(event: any) {
    if (event.keyCode !== 13) {
      this.zipCodeService.searchZipCodes(event.target.value).subscribe(res => {
        this.results = res;
      });
    }

    if (event.keyCode === 13 && !this.matcher.isErrorState(event.target, null) && !this.results.find(x => x.number === event.target.value)) {
      this.zipCodeService.postZipCode(new ZipCodeClass({ number: event.target.value, active: false })).subscribe(res => {
        this.results.unshift(res);
        this.notificationsService.success('Succès !', `Le code postal ${res.number} a été créé`);
      }, err => {
        this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
      });
    }
  }

  zipCodeDeleted(zipCode: ZipCodeClass) {
    this.zipCodeService.deleteZipCode(zipCode.id).subscribe(() => {
      // TODO replace with lodash compose
      let compose = f => g => x => f(g(x));
      let findById = array => id => array.find(x => x.id === id);
      let findIndex = array => item => array.indexOf(item);
      let findIndexById = array => compose(findIndex(array))(findById(array));
      this.results.splice(findIndexById(this.results)(zipCode.id), 1);
      this.notificationsService.success('Succès !', `Le code postal ${zipCode.number} a été supprimé`);
    }, err => {
      this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
    });
  }

  zipCodeChanged(zipCode: ZipCodeClass) {
    this.zipCodeService.patchZipCode(zipCode, zipCode.id).subscribe(res => {
      this.notificationsService.success('Succès !', `Le code postal ${zipCode.number} a été ${zipCode.active ? 'activé' : 'désactivé'}`);
    }, err => {
      this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
    });
  }
}

class ZipCodeErrorStateMatcher implements ErrorStateMatcher {
  zipCodeRegexp: RegExp = /^[0-9]{5}$/;

  constructor() {
  }

  isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    return !this.zipCodeRegexp.test(control.value) && control.value;
  }
}
