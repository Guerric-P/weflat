import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ArchitectClass } from '@weflat/app/core/models/ArchitectClass';
import { AuthenticationService } from '@weflat/app/core/services/authentication.service';
import { ArchitectService } from '@weflat/app/shared/services/architecte.service';
import { Observable } from 'rxjs';

@Injectable()
export class ArchitecteResolver implements Resolve<ArchitectClass> {

  constructor(private architecteService: ArchitectService, private authenticationService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    ArchitectClass | Observable<ArchitectClass> | Promise<ArchitectClass> {
    return this.architecteService.getArchitecte(this.authenticationService.userId);
  }

}
