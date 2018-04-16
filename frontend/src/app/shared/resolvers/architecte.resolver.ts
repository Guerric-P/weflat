import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ArchitecteService } from '../services/architecte.service';
import { ArchitecteClass } from '../../core/models/ArchitecteClass';
import { AuthenticationService } from '../../core/services/authentication.service';

@Injectable()
export class ArchitecteResolver implements Resolve<ArchitecteClass> {

  constructor(private architecteService: ArchitecteService, private authenticationService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ArchitecteClass | Observable<ArchitecteClass> | Promise<ArchitecteClass> {
    return this.architecteService.getArchitecte(this.authenticationService.userId);
  }

}
