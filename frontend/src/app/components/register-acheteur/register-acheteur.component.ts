import { Component, OnInit } from '@angular/core';
import { Acheteur } from 'app/models/acheteur';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from 'app/services/register.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';
import { Constantes } from 'app/common/Constantes';

@Component({
  selector: 'app-register-acheteur',
  templateUrl: './register-acheteur.component.html',
  styleUrls: ['./register-acheteur.component.css']
})
export class RegisterAcheteurComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private registerService: RegisterService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.createForm();
  }

  data: Acheteur = new Acheteur();
  registerForm: FormGroup;

  createForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(Constantes.EMAIL_REGEX)
      ]),
      book: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', Validators.required],
      verifyPassword: new FormControl('', [
        this.matchOtherValidator('password')
      ])
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.registerService.postAcheteur(this.data).subscribe(
      x => {
        this.authenticationService.login(this.data.email, this.data.password).subscribe( x => {
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

}
