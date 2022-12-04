import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@weflat/app/shared/services/user.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  hash: string;
  resetPasswordSucccessful: boolean;
  resetPasswordFailed: boolean;
  resetPasswordButtonDisabled: boolean;
  resetEmailSuccessful: boolean;
  resetEmailFailed: boolean;
  resetEmailButtonDisabled: boolean;
  resetPasswordForm: UntypedFormGroup;
  resetEmailForm: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private _formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.hash = params['hash'];
      });

    this.resetPasswordForm = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.resetEmailForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  changePassword() {
    if (!this.resetPasswordButtonDisabled && !this.resetPasswordForm.invalid) {
      this.resetPasswordButtonDisabled = true;
      this.userService.resetPassword(this.hash, this.resetPasswordForm.value.password).subscribe(() => {
        this.resetPasswordSucccessful = true;
        this.resetPasswordFailed = false;
        this.resetPasswordButtonDisabled = false;
      }, () => {
        this.resetPasswordSucccessful = false;
        this.resetPasswordFailed = true;
        this.resetPasswordButtonDisabled = false;
      });
    }
  }

  sendEmail() {
    if (!this.resetEmailButtonDisabled && !this.resetEmailForm.invalid) {
      this.resetEmailButtonDisabled = true;
      this.userService.forgottenPassword(this.resetEmailForm.value.email).subscribe(() => {
        this.resetEmailSuccessful = true;
        this.resetEmailFailed = false;
        this.resetEmailButtonDisabled = false;
      }, () => {
        this.resetEmailSuccessful = false;
        this.resetEmailFailed = true;
        this.resetEmailButtonDisabled = false;
      });

    }
  }
}
