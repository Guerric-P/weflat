import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatDialogRef } from '@angular/material';
import { ZipCodeClass } from '@weflat/core/models/ZipCodeClass';
import { findIndexById } from '@weflat/core/utils/arrayUtils';
import { ZipCodeService } from '@weflat/shared/services/zip-code.service';
import { NotificationsService } from 'angular2-notifications';

class ZipCodeErrorStateMatcher implements ErrorStateMatcher {
  zipCodeRegexp: RegExp = /^[0-9]{5}$/;

  constructor() {
  }

  isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    return !this.zipCodeRegexp.test(control.value) && control.value;
  }
}

@Component({
  selector: 'app-zip-codes',
  templateUrl: './zip-codes.component.html',
  styleUrls: ['./zip-codes.component.scss']
})
export class ZipCodesComponent implements OnInit {

  results: ZipCodeClass[];
  inputValue: string;
  changedZipCodes: { previous: ZipCodeClass, current: ZipCodeClass }[] = [];
  matcher: ErrorStateMatcher = new ZipCodeErrorStateMatcher();
  @ViewChild('confirmModal', { static: false }) confirmModalTemplate: TemplateRef<any>;
  confirmModal: MatDialogRef<any>;

  get activatedZipCodesCount() {
    return this.changedZipCodes.filter(x => x.current.active).length;
  }

  get deactivatedZipCodesCount() {
    return this.changedZipCodes.filter(x => !x.current.active).length;
  }

  get validateButtonLabel() {
    return 'Valider'
      + (this.activatedZipCodesCount ? ` ${this.activatedZipCodesCount} activation(s)` : '')
      + (this.activatedZipCodesCount && this.deactivatedZipCodesCount ? ' et' : '')
      + (this.deactivatedZipCodesCount ? ` ${this.deactivatedZipCodesCount} désactivation(s)` : '');
  }

  get confirmLabel() {
    return (this.commaSeparatedActivatedZipCodes ? ` l'activation des codes postaux ${this.commaSeparatedActivatedZipCodes}` : '')
      + (this.commaSeparatedActivatedZipCodes && this.commaSeparatedDeactivatedZipCodes ? ' et' : '')
      + (this.commaSeparatedDeactivatedZipCodes ? ` la désactivation des codes postaux ${this.commaSeparatedDeactivatedZipCodes}` : '');
  }

  get commaSeparatedActivatedZipCodes() {
    return this.changedZipCodes.filter(x => x.current.active).map(x => x.current.number).join(', ');
  }

  get commaSeparatedDeactivatedZipCodes() {
    return this.changedZipCodes.filter(x => !x.current.active).map(x => x.current.number).join(', ');
  }

  constructor(
    private zipCodeService: ZipCodeService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onKeyUp(event: any) {
    if (event.keyCode !== 13 && (<string>event.target.value).length >= 2) {
      this.zipCodeService.searchZipCodes(event.target.value).subscribe(res => {
        this.results = res;
        this.results.forEach((result, index) => {
          const changedZipCode = this.changedZipCodes.find(x => result.id === x.previous.id);
          if (changedZipCode) {
            this.results[index] = changedZipCode.current;
          }
        });
      });
    }

    if (event.keyCode === 13
      && !this.matcher.isErrorState(event.target, null)
      && !this.results.find(x => x.number === event.target.value)) {
      this.zipCodeService.postZipCode(new ZipCodeClass({ number: event.target.value, active: false })).subscribe(res => {
        this.results.unshift(res);
        this.notificationsService.success('Succès !', `Le code postal ${res.number} a été créé`);
      }, () => {
        this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
      });
    }
  }

  zipCodeDeleted(zipCode: ZipCodeClass) {
    this.zipCodeService.deleteZipCode(zipCode.id).subscribe(() => {
      this.results.splice(findIndexById(this.results)(zipCode.id), 1);
      const changedZipCode = this.changedZipCodes.find(x => x.previous.id === zipCode.id);
      if (changedZipCode) {
        this.changedZipCodes.splice(this.changedZipCodes.indexOf(changedZipCode), 1);
      }
      this.notificationsService.success('Succès !', `Le code postal ${zipCode.number} a été supprimé`);
    }, () => {
      this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
    });
  }

  zipCodeChanged(zipCode: ZipCodeClass) {
    const result = this.results.find(x => x.id === zipCode.id)
    this.results[this.results.indexOf(result)] = zipCode;
    const changedZipCode = this.changedZipCodes.find((x => x.previous.id === zipCode.id));
    if (changedZipCode) {
      if (zipCode.active === changedZipCode.previous.active) {
        this.changedZipCodes.splice(this.changedZipCodes.indexOf(changedZipCode), 1);
      } else {
        changedZipCode.current.active = zipCode.active;
      }
    } else {
      this.changedZipCodes.push({ previous: Object.assign({}, zipCode, { active: !zipCode.active }), current: { ...zipCode } });
    }
    /*this.zipCodeService.patchZipCode(zipCode, zipCode.id).subscribe(res => {
      this.notificationsService.success('Succès !', `Le code postal ${zipCode.number} a été ${zipCode.active ? 'activé' : 'désactivé'}`);
    }, err => {
      this.notificationsService.error('Erreur', 'Une erreur a eu lieu...');
    });*/
  }

  cancelClick() {
    this.changedZipCodes.forEach(changedZipCode => {
      const result = this.results.find(x => x.id === changedZipCode.previous.id);
      if (result) {
        result.active = changedZipCode.previous.active;
      }
    });
    this.changedZipCodes = [];
  }

  validateClick() {
    this.confirmModal = this.dialog.open(this.confirmModalTemplate);

    this.confirmModal.afterClosed().subscribe(res => {
      if (res) {
        this.zipCodeService.postZipCode(this.changedZipCodes.map(x => x.current)).subscribe(() => {
          this.changedZipCodes = [];
        }, () => {
          this.notificationsService.error('Erreur', 'Une erreur a eu lieu...')
        });
      }
    });
  }

  trackByFn(index: number, item: ZipCodeClass) {
    return item.id;
  }

  closeCancelModal() {
    this.confirmModal.close();
  }
}
