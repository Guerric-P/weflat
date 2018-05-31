import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.hash = params['hash'];
      });
  }

  changePassword(password: string) {
    if (!this.resetPasswordButtonDisabled) {
      this.resetPasswordButtonDisabled = true;
      this.userService.resetPassword(this.hash, password).subscribe(() => {
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

  sendEmail(email: string) {
    if (!this.resetEmailButtonDisabled) {
      this.resetEmailButtonDisabled = true;
      this.userService.forgottenPassword(email).subscribe(() => {
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
