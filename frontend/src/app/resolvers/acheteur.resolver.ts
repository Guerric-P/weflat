import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AcheteurClass } from 'app/models/AcheteurClass';
import { AcheteurService } from 'app/services/acheteur.service';
import { AuthenticationService } from 'app/services/authentication.service';

@Injectable()
export class AcheteurResolver implements Resolve<AcheteurClass> {

  constructor(private acheteurService: AcheteurService, private authService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AcheteurClass | Observable<AcheteurClass> | Promise<AcheteurClass> {
    return this.acheteurService.getAcheteur(this.authService.userId);
  }

}
