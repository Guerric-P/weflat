import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArchitecteClass } from 'app/models/ArchitecteClass';
import { ArchitecteService } from 'app/services/architecte.service';
import { ArchitectTypeService } from 'app/services/architect-type.service';
import { ArchitectSituationService } from 'app/services/architect-situation.service';
import { ArchitectTypeClass } from 'app/models/ArchitectTypeClass';
import { ArchitectSituationClass } from 'app/models/ArchitectSituationClass';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { ArchitectStatusEnum } from 'app/common/enums/ArchitectStatusEnum'
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-architecte-profile',
  templateUrl: './architecte-profile.component.html',
  styleUrls: ['./architecte-profile.component.css']
})
export class ArchitecteProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private architecteService: ArchitecteService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private userService: UserService) { }

  form: FormGroup;
  architectTypes: ArchitectTypeClass[];
  architectSituations: ArchitectSituationClass[];
  architecte: ArchitecteClass;
  dateNow = moment().format('YYYY-MM-DD');

  public ArchitectStatusEnum = ArchitectStatusEnum;

  ngOnInit() {
    this.architecte = this.route.snapshot.data['architecte'];
    this.architectTypes = this.route.snapshot.data['architectTypes'];
    this.architectSituations = this.route.snapshot.data['architectSituations'];

    this.form = this.fb.group({
      firstName: [this.architecte.firstName, Validators.required],
      lastName: [this.architecte.lastName, Validators.required],
      birthDate: [this.architecte.birthDate && moment(this.architecte.birthDate).format('YYYY-MM-DD'), [Validators.required]],
      email: [{value: this.architecte.email, disabled: true}, [Validators.required, Validators.email]],
      telephone: [this.architecte.telephone, [Validators.required, Validators.pattern(/0(6|7)\d{8}/)]],
      type: [this.architecte.type && this.architecte.type.id],
      situation: [this.architecte.situation && this.architecte.situation.id],
      practicingSince: [moment(this.architecte.practicingSince).format('YYYY-MM-DD')],
      webSite: [this.architecte.webSite, Validators.pattern(/^(http|https):\/\/[^ "]+$/)],
      architectsOrder: [this.architecte.architectsOrder],
      cfai: [this.architecte.cfai],
      professionalResponsibility: [this.architecte.professionalResponsibility],
      decennialInsurance: [this.architecte.decennialInsurance],
      motivation: [this.architecte.motivation],
      cgu: [this.architecte.cgu, Validators.requiredTrue]
    });
  }

  onSubmit() {
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
    }
  }

  changePassword(password: string, event?: KeyboardEvent) {
    if(event) event.preventDefault();
    this.userService.changePassword(password).subscribe(res => {
      this.notificationsService.success('Merci !', 'Votre mot de passe a été changé avec succès.');
    }, err => {
      this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors du changement de mot de passe.');
    });
  }
}
