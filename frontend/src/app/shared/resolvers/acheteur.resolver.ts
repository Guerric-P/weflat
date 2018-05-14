import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AcheteurService } from '../services/acheteur.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { CustomerClass } from '../../core/models/CustomerClass';

@Injectable()
export class AcheteurResolver implements Resolve<CustomerClass> {

  constructor(private acheteurService: AcheteurService, private authService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CustomerClass | Observable<CustomerClass> | Promise<CustomerClass> {
    return this.acheteurService.getAcheteur(this.authService.userId);
  }

}
