import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Constantes } from 'app/common/Constantes';
import { ArchitecteClass } from 'app/models/ArchitecteClass';
import { RegisterService } from 'app/services/register.service';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-architecte',
  templateUrl: './register-architecte.component.html',
  styleUrls: ['./register-architecte.component.css']
})
export class RegisterArchitecteComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private registerService: RegisterService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.createForm();
  }

  data: ArchitecteClass = new ArchitecteClass();
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
    this.registerService.postArchitecte(this.data).subscribe(
      x => {
        this.authenticationService.login(this.data.email, this.data.password).subscribe( x => {
          this.authenticationService.returnUrl = null;
          this.router.navigate(['architecte']);
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
