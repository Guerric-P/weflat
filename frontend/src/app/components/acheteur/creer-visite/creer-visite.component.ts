import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { SessionStorageService } from 'app/services/session-storage.service';

@Component({
  selector: 'app-creer-visite',
  templateUrl: './creer-visite.component.html',
  styleUrls: ['./creer-visite.component.css']
})
export class CreerVisiteComponent implements OnInit {

  isLinear = true;
  dateFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  place: any;

  constructor(private _formBuilder: FormBuilder, private adapter: DateAdapter<any>, private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.dateFormGroup = this._formBuilder.group({
      datePicker: ['', Validators.required]
    });
    this.addressFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.adapter.setLocale('fr');

    this.place = this.sessionStorageService.place;
  }

}
