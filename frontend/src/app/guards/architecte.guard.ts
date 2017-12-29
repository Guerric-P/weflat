import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Constantes } from 'app/common/Constantes';
import { AuthenticationService } from 'app/services/authentication.service';

@Injectable()
export class ArchitecteGuard implements CanActivate {

  constructor(private router: Router, private localStorageService: LocalStorageService, private authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.localStorageService.tokenPayload.roles[0].authority === Constantes.ROLE_ARCHITECTE) {
        return true;
      }
      // not logged in so redirect to login page with the return 
      this.authService.returnUrl = state.url;
      this.router.navigate(['/']);
      return false;
  }
}
