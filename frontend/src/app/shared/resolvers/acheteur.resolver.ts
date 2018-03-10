import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AcheteurService } from '../services/acheteur.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AcheteurClass } from '../../core/models/AcheteurClass';

@Injectable()
export class AcheteurResolver implements Resolve<AcheteurClass> {

  constructor(private acheteurService: AcheteurService, private authService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AcheteurClass | Observable<AcheteurClass> | Promise<AcheteurClass> {
    return this.acheteurService.getAcheteur(this.authService.userId);
  }

}
