import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArchitectClass } from '@weflat/core/models/ArchitectClass';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { Constantes } from '@weflat/shared/common/Constantes';
import { ArchitectService } from '@weflat/shared/services/architecte.service';
import { NotificationsService } from 'angular9-notifications';

@Component({
  selector: 'app-register-architecte',
  templateUrl: './register-architecte.component.html',
  styleUrls: ['./register-architecte.component.scss']
})
export class RegisterArchitecteComponent implements OnInit {

  @Input() withoutBoxShadow: boolean;
  data: ArchitectClass = new ArchitectClass();
  registerForm: FormGroup;
  submitButtonDisabled = false;

  constructor(private fb: FormBuilder,
    private architecteService: ArchitectService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationsService: NotificationsService) {
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
      this.architecteService.postArchitecte(this.data).subscribe(
        () => {
          this.authenticationService.login(this.data.email, this.data.password).subscribe(() => {
            this.authenticationService.returnUrl = null;
            this.router.navigate(['/architecte/profile']);
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
}
