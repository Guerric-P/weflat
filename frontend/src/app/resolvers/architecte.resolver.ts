import { Injectable } from '@angular/core';
import { ArchitecteClass } from 'app/models/ArchitecteClass';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ArchitecteService } from 'app/services/architecte.service';

@Injectable()
export class ArchitecteResolver implements Resolve<ArchitecteClass> {

  constructor(private architecteService: ArchitecteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ArchitecteClass | Observable<ArchitecteClass> | Promise<ArchitecteClass> {
    return this.architecteService.getArchitecte();
  }

}
