import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AcheteurService } from '../../../shared/services/acheteur.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ShowSigninPopupService } from '../../services/show-signin-popup.service';
import { Constantes } from '../../../shared/common/Constantes';
import { AcheteurClass } from '../../models/AcheteurClass';

@Component({
  selector: 'app-register-acheteur',
  templateUrl: './register-acheteur.component.html',
  styleUrls: ['./register-acheteur.component.scss']
})
export class RegisterAcheteurComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private acheteurService: AcheteurService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private showSigninPopupService: ShowSigninPopupService) {
    this.createForm();
  }

  data: AcheteurClass = new AcheteurClass();
  registerForm: FormGroup;
  @Input() isEmbedded: boolean = false;

  createForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(Constantes.EMAIL_REGEX)
      ]),
      book: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifyPassword: new FormControl('', [
        this.matchOtherValidator('password')
      ])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.acheteurService.postAcheteur(this.data).subscribe(
      x => {
        this.authenticationService.login(this.data.email, this.data.password).subscribe(x => {
          this.authenticationService.returnUrl = null;
          if (!this.isEmbedded)
            this.router.navigate(['acheteur']);
        });
      });
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
