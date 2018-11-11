import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { Router } from '@angular/router';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss']
})
export class SigninModalComponent implements OnInit {
  errorMessage: string;
  disabled: boolean;
  model: any = {};

  constructor(
    private dialogRef: MatDialogRef<SigninModalComponent>,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) private data,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.errorMessage = this.data && this.data.errorMessage;

    this.dialogRef.afterClosed().subscribe(() => {
      this.errorMessage = null;
      this.authService.returnUrl = null;
    }, () => {
      this.errorMessage = null;
      this.authService.returnUrl = null;
    });
  }

  login() {
    this.disabled = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
        () => {
          this.dialogRef.close();
          if (this.authService.returnUrl) {
            this.router.navigate([this.authService.returnUrl]);
            this.authService.returnUrl = null;
          }
        },
        () => {
          this.errorMessage = 'Erreur lors de l\'authentification';
          this.disabled = false;
        });
  }

  close(openSignup: boolean) {
    this.dialogRef.close();

    if (openSignup) {
      this.dialog.open(SignupModalComponent);
    }
  }
}
