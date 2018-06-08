import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ArchitectService } from '../services/architecte.service';
import { ArchitectClass } from '../../core/models/ArchitectClass';
import { AuthenticationService } from '../../core/services/authentication.service';

@Injectable()
export class ArchitecteResolver implements Resolve<ArchitectClass> {

  constructor(private architecteService: ArchitectService, private authenticationService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    ArchitectClass | Observable<ArchitectClass> | Promise<ArchitectClass> {
    return this.architecteService.getArchitecte(this.authenticationService.userId);
  }

}
