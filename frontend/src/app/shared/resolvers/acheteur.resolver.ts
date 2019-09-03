import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CustomerClass } from '@weflat/core/models/CustomerClass';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { AcheteurService } from '@weflat/shared/services/acheteur.service';
import { Observable } from 'rxjs';

@Injectable()
export class AcheteurResolver implements Resolve<CustomerClass> {

  constructor(private acheteurService: AcheteurService, private authService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CustomerClass | Observable<CustomerClass> | Promise<CustomerClass> {
    return this.acheteurService.getAcheteur(this.authService.userId);
  }

}
