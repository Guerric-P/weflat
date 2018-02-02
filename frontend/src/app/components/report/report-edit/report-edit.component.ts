import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { VisiteService } from 'app/services/visite.service';
import { ReportClass } from 'app/models/ReportClass';
import { ReportService } from 'app/services/report.service';
import * as moment from 'moment';
import { PositionClass } from 'app/models/PositionClass';
import { AbstractControl } from '@angular/forms/src/model';
import { RenovationClass } from 'app/models/RenovationClass';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private visiteService: VisiteService,
    private reportService: ReportService) { }

  form: FormGroup;
  report: ReportClass;
  positions: PositionClass[];
  sumAmounts: number;

  //dateNow = moment().format('YYYY-MM-DD');

  //public ArchitectStatusEnum = ArchitectStatusEnum;

  ngOnInit() {
    this.report = this.route.snapshot.data['report'];
    this.positions = this.route.snapshot.data['positions'];

    const formattedDate = this.report.visite.streetNumber
      + ', '
      + this.report.visite.route
      + ' - '
      + this.report.visite.zipCode.number
      + ' '
      + this.report.visite.city;

    const controlsConfig: any[] = [];

    if (this.report.renovations && this.report.renovations.length) {
      for (let renovation of this.report.renovations) {
        controlsConfig.push(this.fb.group({
          position: [renovation.position.id, [Validators.required]],
          condition: [renovation.condition, [Validators.required]],
          estimatedWork: [renovation.estimatedWork, [Validators.required]],
          remarks: [renovation.remarks, [Validators.required]]
        }));
      }
    }

    this.form = this.fb.group({
      firstName: [{ value: this.report.visite.acheteur.firstName, disabled: true }, [Validators.required]],
      lastName: [{ value: this.report.visite.acheteur.lastName, disabled: true }, [Validators.required]],
      visitDate: [{ value: moment(this.report.visite.visiteDate).format('YYYY-MM-DD'), disabled: true }, [Validators.required]],
      address: [{ value: formattedDate, disabled: true }, [Validators.required]],
      surface: [this.report.surface, [Validators.required]],
      rooms: [this.report.rooms, [Validators.required]],
      floor: [this.report.floor, [Validators.required]],
      orientation: [this.report.orientation, [Validators.required]],
      renovations: this.fb.array(controlsConfig, Validators.required),
      generalRemarks: [this.report.generalRemarks, [Validators.required]],
      expectations: [this.report.expectations, [Validators.required]],
      globalQualityRemarks: [this.report.globalQualityRemarks, [Validators.required]],
      globalCondition: [this.report.globalCondition, [Validators.required]]
    });

    this.form.valueChanges.subscribe(() => {
      this.formChanged();
    });
  }

  formChanged(): void {
    this.sumAmounts = 0;
    const renovations = <FormArray>this.form.controls['renovations'];
    renovations.controls.forEach(formGroup => {
      const c = formGroup.get('estimatedWork');
      this.sumAmounts += new Number(c.value).valueOf();
    });

  }

  onSubmit() {
    const formModel = this.form.value;

    const renovationsModel: RenovationClass[] = [];

    const renovations = <FormArray>this.form.controls['renovations'];
    renovations.controls.forEach(formGroup => {
      const renovation: RenovationClass = new RenovationClass({
        position: new PositionClass({ id: formGroup.get('position').value }),
        condition: formGroup.get('condition').value,
        remarks: formGroup.get('remarks').value,
        estimatedWork: formGroup.get('estimatedWork').value
      });
      renovationsModel.push(renovation);
    });

    if (!this.form.invalid) {
      const report = new ReportClass({
        renovations: renovationsModel,
        floor: formModel.floor,
        generalRemarks: formModel.generalRemarks,
        orientation: formModel.orientation,
        rooms: formModel.rooms,
        surface: formModel.surface,
        expectations: formModel.expectations,
        globalQualityRemarks: formModel.globalQualityRemarks,
        globalCondition: formModel.globalCondition,
      });

      this.reportService.postReport(this.report.visite.id, report).subscribe(res => {
        this.notificationsService.success('Merci !', 'Vos informations ont été sauvegardées avec succès.');
      }, err => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors de l\'enregistrement de vos informations.');
      });
    }
    else {
      this.touchAll(this.form);

      this.notificationsService.error('Oups !', 'Les données saisies sont erronées ou incomplètes.');
    }
  }

  touchAll(formGroup: FormGroup | FormArray, func = 'markAsTouched', opts = { onlySelf: false }): void {
    Object.keys(formGroup.controls).forEach(field => {
      const c = formGroup.get(field);
      if (c instanceof FormGroup || c instanceof FormArray) {
        this.touchAll(c, func, opts);
      }

      else
        c[func](opts);
    });
  }

  addRenovation() {

    const control = <FormArray>this.form.controls['renovations'];

    control.push(this.fb.group({
      position: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      estimatedWork: ['', [Validators.required]],
      remarks: ['', [Validators.required]]
    }));
  }

  removeRenovation(index: number) {

    const control = <FormArray>this.form.controls['renovations'];

    control.removeAt(index);
  }

}
