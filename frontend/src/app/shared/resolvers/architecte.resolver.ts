import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ArchitectClass } from '@weflat/core/models/ArchitectClass';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { ArchitectService } from '@weflat/shared/services/architecte.service';
import { Observable } from 'rxjs';

@Injectable()
export class ArchitecteResolver implements Resolve<ArchitectClass> {

  constructor(private architecteService: ArchitectService, private authenticationService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    ArchitectClass | Observable<ArchitectClass> | Promise<ArchitectClass> {
    return this.architecteService.getArchitecte(this.authenticationService.userId);
  }

}
