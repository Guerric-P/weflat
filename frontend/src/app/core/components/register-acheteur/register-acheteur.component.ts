import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerClass } from '@weflat/core/models/CustomerClass';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { ShowSigninPopupService } from '@weflat/core/services/show-signin-popup.service';
import { Constantes } from '@weflat/shared/common/Constantes';
import { AcheteurService } from '@weflat/shared/services/acheteur.service';
import { NotificationsService } from 'angular9-notifications';

@Component({
  selector: 'app-register-acheteur',
  templateUrl: './register-acheteur.component.html',
  styleUrls: ['./register-acheteur.component.scss']
})
export class RegisterAcheteurComponent implements OnInit {

  data: CustomerClass = new CustomerClass();
  registerForm: FormGroup;
  @Input() isEmbedded = false;
  submitButtonDisabled = false;

  constructor(
    private fb: FormBuilder,
    private acheteurService: AcheteurService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private showSigninPopupService: ShowSigninPopupService,
    private notificationsService: NotificationsService
  ) {

  }

  createForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(Constantes.EMAIL_REGEX)
      ]),
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifyPassword: new FormControl('', [
        this.matchOtherValidator('password')
      ])
    });
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.submitButtonDisabled = true;
      this.acheteurService.postAcheteur(this.data).subscribe(
        () => {
          this.authenticationService.login(this.data.email, this.data.password).subscribe(() => {
            this.authenticationService.returnUrl = null;
            if (!this.isEmbedded) {
              this.router.navigate(['acheteur']);
            }
          }, err => {
            this.notificationsService.error('Erreur', 'Une erreur est survenue...');
            this.submitButtonDisabled = false;
          });
        }, err => {
          this.notificationsService.error('Erreur', 'Une erreur est survenue, un compte lié à cette addresse e-mail existe-t-il déjà ?');
          this.submitButtonDisabled = false;
        });
    } else {
      this.notificationsService.error('Erreur', 'Il y a une ou plusieurs erreur(s) dans le formulaire d\'inscription, vérifiez votre saisie');
    }
  }

  matchOtherValidator(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOther(control: FormControl) {
      if (!control.parent) {
        return null;
      }
      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        // Get the other control from the parent
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        // If other control change, we must compute again the validity
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }
      if (!otherControl) {
        return null;
      }
      return (otherControl.value === thisControl.value) ? null : { verifyPasswordFailed: true };
    }
  }

  openSigninPopup() {
    this.showSigninPopupService.showSigninPopup();
  }
}
