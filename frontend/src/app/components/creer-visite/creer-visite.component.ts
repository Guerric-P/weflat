import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-creer-visite',
  templateUrl: './creer-visite.component.html',
  styleUrls: ['./creer-visite.component.css']
})
export class CreerVisiteComponent implements OnInit {

  isLinear = true;
  dateFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private adapter: DateAdapter<any>) { }

  ngOnInit() {
    this.dateFormGroup = this._formBuilder.group({
      datePicker: ['', Validators.required]
    });
    this.addressFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.adapter.setLocale('fr');
  }

}
