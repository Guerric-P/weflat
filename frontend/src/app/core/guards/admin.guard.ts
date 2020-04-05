import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { SigninModalComponent } from '@weflat/core/components/common/signin-modal/signin-modal.component';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { LoaderService } from '@weflat/shared/services/loader.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AdminGuard implements CanActivate {
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

    if (this.authService.isAdmin) {
      return true;
    }

    // Prevent the bug described here: https://stackoverflow.com/questions/54696147/how-to-deal-with-a-modal-shown-in-a-guard
    if (this.isBrowser) {
      this.loaderService.lock();
      const dialog = this.dialog.open(SigninModalComponent, {
        data: {
          errorMessage: this.authService.isLoggedIn ?
            'Vous n\'avez pas accès à cette page, connectez-vous avec un compte approprié' :
            'Connectez-vous pour accéder à cette page'
        }
      });

      return dialog.afterClosed().pipe(
        tap(() => this.loaderService.unlock()),
        map(() => {
          return this.authService.isAdmin;
        })
      );
    } else {
      return false;
    }
  }
}
