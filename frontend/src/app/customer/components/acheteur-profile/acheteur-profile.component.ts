import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerClass } from '@weflat/app/core/models/CustomerClass';
import { AuthenticationService } from '@weflat/app/core/services/authentication.service';
import { AcheteurService } from '@weflat/app/shared/services/acheteur.service';
import { UserService } from '@weflat/app/shared/services/user.service';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';

@Component({
  selector: 'app-acheteur-profile',
  templateUrl: './acheteur-profile.component.html',
  styleUrls: ['./acheteur-profile.component.scss']
})
export class AcheteurProfileComponent implements OnInit {

  form: UntypedFormGroup;
  passwordForm: UntypedFormGroup;
  acheteur: CustomerClass;
  dateNow = moment().format('YYYY-MM-DD');

  constructor(
    private fb: UntypedFormBuilder,
    private acheteurService: AcheteurService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.acheteur = this.route.snapshot.data['acheteur'];

    this.form = this.fb.group({
      firstName: [this.acheteur.firstName, Validators.required],
      lastName: [this.acheteur.lastName, Validators.required],
      birthDate: [this.acheteur.birthDate && moment(this.acheteur.birthDate).format('YYYY-MM-DD'), [Validators.required]],
      email: [{ value: this.acheteur.email, disabled: true }, [Validators.required, Validators.email]],
      telephone: [this.acheteur.telephone, [Validators.required, Validators.pattern(/0(6|7)\d{8}/)]]
    });

    this.passwordForm = this.fb.group({
      password: [null, Validators.minLength(6)]
    });
  }

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 767px)');
  }

  onSubmit() {
    const formModel = this.form.value;

    if (!this.form.invalid) {
      const acheteur = new CustomerClass({
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
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.notificationsService.error('Oups !', 'Les données saisies sont erronées ou incomplètes.');
    }
  }

  changePassword(password: string, event?: KeyboardEvent) {
    if (event) { event.preventDefault(); }
    if (this.passwordForm.controls.password.value && this.passwordForm.valid) {
      this.userService.changePassword(this.acheteur.id, password).subscribe(res => {
        this.notificationsService.success('Merci !', 'Votre mot de passe a été changé avec succès.');
      }, err => {
        this.notificationsService.error('Désolé...', 'Une erreur a eu lieu lors du changement de mot de passe.');
      });
    }
  }
}
