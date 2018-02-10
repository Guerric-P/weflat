import { Component, OnInit, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { VisiteService } from 'app/services/visite.service';
import { ReportClass } from 'app/models/ReportClass';
import { ReportService } from 'app/services/report.service';
import * as moment from 'moment';
import { PositionClass } from 'app/models/PositionClass';
import { AbstractControl } from '@angular/forms/src/model';
import { RenovationClass } from 'app/models/RenovationClass';
import { PositionEnum } from 'app/common/enums/PositionEnum';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private reportService: ReportService,
    private modalService: NgbModal,
    private router: Router) { }

  form: FormGroup;
  report: ReportClass;
  positions: PositionClass[];
  sumAmounts: number;
  mandatoryPositions: PositionClass[];
  mandatoryPositionsIds: number[];
  submitModal: NgbModalRef;
  submitConfirmModal: NgbModalRef;
  @ViewChild('submitModal') submitModalTemplate: TemplateRef<any>;
  @ViewChild('submitConfirmModal') submitConfirmModalTemplate: TemplateRef<any>;
  renovations: FormArray;

  ngOnInit() {
    this.report = this.route.snapshot.data['report'];
    this.positions = this.route.snapshot.data['positions'];
    this.mandatoryPositions = this.positions.filter(x => x.mandatory);
    this.mandatoryPositionsIds = this.mandatoryPositions.map(x => x.id);

    const formattedDate = this.report.visite.streetNumber
      + ', '
      + this.report.visite.route
      + ' - '
      + this.report.visite.zipCode.number
      + ' '
      + this.report.visite.city;

    const controlsConfig: any[] = [];
    const controls: any[] = [];

    if (this.report.renovations && this.report.renovations.length) {
      for (let renovation of this.report.renovations) {

        //Add saved mandatory positions
        if (renovation.position.mandatory) {
          controls.push({
            id: [renovation.id],
            position: [{ value: renovation.position.id, disabled: true }, [Validators.required]],
            condition: [renovation.condition, [Validators.required]],
            estimatedWork: [renovation.estimatedWork, [Validators.required]],
            remarks: [renovation.remarks, [Validators.required]]
          });
        }

        const missingMandatoryRows = this.mandatoryPositions.filter(x => !this.report.renovations.map(x => x.position.id).includes(x.id));

        //Add unsaved mandatory positions
        for (let position of missingMandatoryRows) {
          controls.push({
            id: [null],
            position: [{ value: position.id, disabled: true }, [Validators.required]],
            condition: [null, [Validators.required]],
            estimatedWork: [null, [Validators.required]],
            remarks: [null, [Validators.required]]
          })
        }
      }

      for (let renovation of this.report.renovations) {
         //Add saved optional positions
         if (!renovation.position.mandatory) {
          controls.push({
            id: [renovation.id],
            position: [renovation.position.id, [Validators.required]],
            condition: [renovation.condition, [Validators.required]],
            estimatedWork: [renovation.estimatedWork, [Validators.required]],
            remarks: [renovation.remarks, [Validators.required]]
          });
        }
      }
    }
    else {
      //Add unsaved mandatory positions
      for (let position of this.mandatoryPositions) {
        controls.push({
          id: [null],
          position: [{ value: position.id, disabled: true }, [Validators.required]],
          condition: [null, [Validators.required]],
          estimatedWork: [null, [Validators.required]],
          remarks: [null, [Validators.required]]
        })
      }
    }

    for (let control of controls) {
      controlsConfig.push(this.fb.group(control));
    }

    this.form = this.fb.group({
      firstName: [{ value: this.report.visite.acheteur.firstName, disabled: true }, [Validators.required]],
      lastName: [{ value: this.report.visite.acheteur.lastName, disabled: true }, [Validators.required]],
      visitDate: [{ value: moment(this.report.visite.visiteDate).format('YYYY-MM-DD'), disabled: true }, [Validators.required]],
      address: [{ value: formattedDate, disabled: true }, [Validators.required]],
      surface: [this.report.id ? this.report.surface : '', [Validators.required]],
      rooms: [this.report.id ? this.report.rooms : '', [Validators.required]],
      floor: [this.report.id ? this.report.floor : '', [Validators.required]],
      orientation: [this.report.id ? this.report.orientation : '', [Validators.required]],
      renovations: this.fb.array(controlsConfig, Validators.required),
      generalRemarks: [this.report.id ? this.report.generalRemarks : '', [Validators.required]],
      expectations: [this.report.id ? this.report.expectations : '', [Validators.required]],
      globalQualityRemarks: [this.report.id ? this.report.globalQualityRemarks : '', [Validators.required]],
      globalCondition: [this.report.id ? this.report.globalCondition : '', [Validators.required]]
    });

    this.renovations = <FormArray>this.form.controls['renovations'];

    //Initialize sumAmounts
    this.formChanged();

    this.form.valueChanges.subscribe(() => {
      this.formChanged();
    });
  }

  formChanged(): void {
    this.sumAmounts = 0;
    this.renovations.controls.forEach(formGroup => {
      const c = formGroup.get('estimatedWork');
      this.sumAmounts += new Number(c.value).valueOf();
    });
  }

  onSubmit(callback?: Function) {
    if (!this.form.invalid) {
      this.saveForm(callback);
    }
    else {
      this.touchAll(this.form);
      this.notificationsService.error('Oups !', 'Les données saisies sont erronées ou incomplètes.');
    }
  }

  saveForm(callback?: Function) {
    const formModel = this.form.value;

    const renovationsModel: RenovationClass[] = [];

    this.renovations.controls.forEach(formGroup => {
      const renovation: RenovationClass = new RenovationClass({
        id: formGroup.get('id') && formGroup.get('id').value || null,
        position: new PositionClass({ id: formGroup.get('position').value }),
        condition: formGroup.get('condition').value,
        remarks: formGroup.get('remarks').value,
        estimatedWork: formGroup.get('estimatedWork').value
      });
      renovationsModel.push(renovation);
    });

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

    if (!this.report.id) {
      this.reportService.postReport(this.report.visite.id, report).subscribe(res => {
        this.notificationsService.success('Merci !', 'Vos informations ont été sauvegardées avec succès.');
        this.form.markAsUntouched();
        if(callback){
          callback();
        }
      }, err => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors de la création du compte-rendu.');
      });
    }
    else {
      this.reportService.patchReport(this.report.visite.id, report).subscribe(res => {
        this.notificationsService.success('Merci !', 'Vos informations ont été sauvegardées avec succès.');
        this.form.markAsUntouched();
        if(callback){
          callback();
        }
      }, err => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors de la mise à jour du compte-rendu.');
      });
    }
  }

  submitForm() {
    this.reportService.submitReport(this.report.visite.id).subscribe(res => {
      this.router.navigate(['/architecte/visits']);
    }, err => {
      this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors de la soumission du compte-rendu.');
    })
  }

  submitClick() {
    if (this.form.touched) {
      this.submitModal = this.modalService.open(this.submitModalTemplate);

      this.submitModal.result.then((result) => {
        this.onSubmit();
      }, (reason) => {

      });
    }
    else {
      this.submitConfirmModal = this.modalService.open(this.submitConfirmModalTemplate);

      this.submitConfirmModal.result.then((result) => {
        this.onSubmit(function() {
          this.submitForm();
        }.bind(this));
      }, (reason) => {

      });
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
    this.renovations.push(this.fb.group({
      position: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      estimatedWork: ['', [Validators.required]],
      remarks: ['', [Validators.required]]
    }));
  }

  removeRenovation(index: number) {
    this.renovations.removeAt(index);
  }
}
