import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { SigninModalComponent } from '../components/common/signin-modal/signin-modal.component';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AdminGuard implements CanActivate {
  isBrowser: boolean;

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAdmin) {
      return true;
    }

    // Prevent the bug described here: https://stackoverflow.com/questions/54696147/how-to-deal-with-a-modal-shown-in-a-guard
    if (this.isBrowser) {
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
    } else {
      return false;
    }
  }
}
