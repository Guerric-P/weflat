import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Constantes } from '../../shared/common/Constantes';

@Injectable()
export class ArchitecteGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isArchitect) {
        return true;
      }
      // not logged in so redirect to login page with the return
      this.authService.returnUrl = state.url;
      this.router.navigate(['/']);
      return false;
  }
}
