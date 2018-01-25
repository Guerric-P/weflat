import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArchitecteClass } from 'app/models/ArchitecteClass';
import { ArchitecteService } from 'app/services/architecte.service';
import { ArchitectTypeService } from 'app/services/architect-type.service';
import { ArchitectSituationService } from 'app/services/architect-situation.service';
import { ArchitectTypeClass } from 'app/models/ArchitectTypeClass';
import { ArchitectSituationClass } from 'app/models/ArchitectSituationClass';
import * as moment from 'moment';

@Component({
  selector: 'app-architecte-profile',
  templateUrl: './architecte-profile.component.html',
  styleUrls: ['./architecte-profile.component.css']
})
export class ArchitecteProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private architecteService: ArchitecteService,
    private architectSituationService: ArchitectSituationService,
    private architectTypeService: ArchitectTypeService) { }

  form: FormGroup;
  architectTypes: ArchitectTypeClass[];
  architectSituations: ArchitectSituationClass[];

  ngOnInit() {
    this.architectSituationService.getSituations().subscribe(res => {
      this.architectSituations = res;
    });

    this.architectTypeService.getTypes().subscribe(res => {
      this.architectTypes = res;
    });

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      type: [''],
      situation: [''],
      practicingSince: [''],
      webSite: [''],
      architectsOrder: [''],
      cfai: [''],
      professionalResponsibility: [''],
      decennialInsurance: [''],
      motivation: [''],
      cgu: ['']
    });
  }

  onSubmit() {
    const formModel = this.form.value;

    if (!this.form.invalid) {
      const architect = new ArchitecteClass({
        firstName: formModel.firstName,
        lastName: formModel.lastName,
        birthDate: formModel.birthDate,
        email: formModel.email,
        telephone: formModel.telephone,
        type: new ArchitectTypeClass({ id: formModel.type }),
        situation: new ArchitectSituationClass({ id: formModel.situation }),
        practicingSince: moment(formModel.practicingSince).toDate(),
        webSite: formModel.webSite,
        architectsOrder: formModel.architectsOrder,
        cfai: formModel.cfai,
        professionalResponsibility: formModel.professionalResponsibility,
        decennialInsurance: formModel.decennialInsurance,
        motivation: formModel.motivation,
      });

      this.architecteService.patchArchitecte(architect).subscribe(res => {
        console.log('ouais gros');
      }, err => {

      });
    }
    else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
