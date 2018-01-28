import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { VisiteService } from 'app/services/visite.service';
import { ReportClass } from 'app/models/ReportClass';
import { ReportService } from 'app/services/report.service';

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
  //dateNow = moment().format('YYYY-MM-DD');

  //public ArchitectStatusEnum = ArchitectStatusEnum;

  ngOnInit() {
    this.report = this.route.snapshot.data['report'];
    this.form = this.fb.group({
      firstName: [{value: this.report.visite.acheteur.firstName, disabled: true}],
      lastName: [{value: this.report.visite.acheteur.lastName, disabled: true}],
    });
    
  }

  onSubmit() {/*
    const formModel = this.form.value;

    if (!this.form.invalid) {
      const architect = new ArchitecteClass({
        firstName: formModel.firstName,
        lastName: formModel.lastName,
        birthDate: formModel.birthDate,
        telephone: formModel.telephone,
        type: new ArchitectTypeClass({ id: formModel.type }),
        situation: new ArchitectSituationClass({ id: formModel.situation }),
        practicingSince: new Date(formModel.practicingSince),
        webSite: formModel.webSite,
        architectsOrder: formModel.architectsOrder,
        cfai: formModel.cfai,
        professionalResponsibility: formModel.professionalResponsibility,
        decennialInsurance: formModel.decennialInsurance,
        motivation: formModel.motivation,
        cgu: formModel.cgu
      });

      this.architecteService.patchArchitecte(architect).subscribe(res => {
        this.notificationsService.success('Merci !', 'Vos informations ont été sauvegardées avec succès.');
      }, err => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors de l\'enregistrement de vos informations.');
      });
    }
    else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.notificationsService.error('Oups !', 'Les données saisies sont erronées ou incomplètes.');
    }*/
  }

}
