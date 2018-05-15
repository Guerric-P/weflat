import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { Constantes } from '../../shared/common/Constantes';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private localStorageService: LocalStorageService, private authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.localStorageService.tokenPayload.roles[0].authority === Constantes.ROLE_ADMIN) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.authService.returnUrl = state.url;
    this.router.navigate(['/']);
    return false;
  }
}
