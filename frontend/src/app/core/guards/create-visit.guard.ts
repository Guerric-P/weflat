import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material';
import { SigninModalComponent } from '../components/common/signin-modal/signin-modal.component';
import { map, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { LoaderService } from 'app/shared/services/loader.service';

@Injectable()
export class CreateVisitGuard implements CanActivate {
  isBrowser: boolean;

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) platformId: string,
    private loaderService: LoaderService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isLoggedIn || this.authService.isCustomer) {
      // logged in so return true
      return true;
    }
    // Prevent the bug described here: https://stackoverflow.com/questions/54696147/how-to-deal-with-a-modal-shown-in-a-guard
    if (this.isBrowser) {
      this.loaderService.hide();
      const dialog = this.dialog.open(SigninModalComponent, {
        data: {
          errorMessage: 'Vous n\'avez pas accès à cette page, connectez-vous avec un compte approprié'
        }
      });

      return dialog.afterClosed().pipe(
        tap(() => this.loaderService.show()),
        map(() => {
          return this.authService.isCustomer;
        })
      );
    } else {
      return false;
    }
  }
}
