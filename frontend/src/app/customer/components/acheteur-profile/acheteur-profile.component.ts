import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
declare var moment;
import { AcheteurService } from '../../../shared/services/acheteur.service';
import { UserService } from '../../../shared/services/user.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { AcheteurClass } from '../../../core/models/AcheteurClass';

@Component({
  selector: 'app-acheteur-profile',
  templateUrl: './acheteur-profile.component.html',
  styleUrls: ['./acheteur-profile.component.scss']
})
export class AcheteurProfileComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private acheteurService: AcheteurService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService) { }

  form: FormGroup;
  acheteur: AcheteurClass;
  dateNow = moment().format('YYYY-MM-DD');

  ngOnInit() {
    this.acheteur = this.route.snapshot.data['acheteur'];

    this.form = this.fb.group({
      firstName: [this.acheteur.firstName, Validators.required],
      lastName: [this.acheteur.lastName, Validators.required],
      birthDate: [this.acheteur.birthDate && moment(this.acheteur.birthDate).format('YYYY-MM-DD'), [Validators.required]],
      email: [{ value: this.acheteur.email, disabled: true }, [Validators.required, Validators.email]],
      telephone: [this.acheteur.telephone, [Validators.required, Validators.pattern(/0(6|7)\d{8}/)]]
    });
  }

  onSubmit() {
    const formModel = this.form.value;

    if (!this.form.invalid) {
      const acheteur = new AcheteurClass({
        firstName: formModel.firstName,
        lastName: formModel.lastName,
        birthDate: formModel.birthDate,
        telephone: formModel.telephone
      });

      this.acheteurService.patchAcheteur(acheteur, this.authService.userId).subscribe(res => {
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
    if (event) event.preventDefault();
    this.userService.changePassword(this.acheteur.id, password).subscribe(res => {
      this.notificationsService.success('Merci !', 'Votre mot de passe a été changé avec succès.');
    }, err => {
      this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors du changement de mot de passe.');
    });
  }
}
