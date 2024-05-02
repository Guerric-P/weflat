import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerClass } from '@weflat/app/core/models/CustomerClass';
import { AuthenticationService } from '@weflat/app/core/services/authentication.service';
import { AcheteurService } from '@weflat/app/shared/services/acheteur.service';
import { Observable } from 'rxjs';

@Injectable()
export class AcheteurResolver  {

  constructor(private acheteurService: AcheteurService, private authService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CustomerClass | Observable<CustomerClass> | Promise<CustomerClass> {
    return this.acheteurService.getAcheteur(this.authService.userId);
  }

}
