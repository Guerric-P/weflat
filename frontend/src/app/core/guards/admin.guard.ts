import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material';
import { SigninModalComponent } from '../components/common/signin-modal/signin-modal.component';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAdmin) {
      return true;
    }

    const dialog = this.dialog.open(SigninModalComponent, {
      data: {
        errorMessage: this.authService.isLoggedIn ?
          'Vous n\'avez pas accès à cette page, connectez-vous avec un compte approprié' :
          'Connectez-vous pour accéder à cette page'
      }
    });

    return dialog.afterClosed().pipe(
      map(() => {
        return this.authService.isAdmin;
      })
    );
  }
}
