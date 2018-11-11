import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material';
import { SigninModalComponent } from '../components/common/signin-modal/signin-modal.component';
import { map } from 'rxjs/operators';

@Injectable()
export class CreateVisitGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isLoggedIn || this.authService.isCustomer) {
      // logged in so return true
      return true;
    }

    const dialog = this.dialog.open(SigninModalComponent, {
      data: {
        errorMessage: 'Vous n\'avez pas accès à cette page, connectez-vous avec un compte approprié'
      }
    });

    return dialog.afterClosed().pipe(
      map(() => {
        return this.authService.isCustomer;
      })
    );
  }
}
