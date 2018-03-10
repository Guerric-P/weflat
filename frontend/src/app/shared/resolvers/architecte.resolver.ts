import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ArchitecteService } from '../services/architecte.service';
import { ArchitecteClass } from '../../core/models/ArchitecteClass';

@Injectable()
export class ArchitecteResolver implements Resolve<ArchitecteClass> {

  constructor(private architecteService: ArchitecteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ArchitecteClass | Observable<ArchitecteClass> | Promise<ArchitecteClass> {
    return this.architecteService.getArchitecte();
  }

}
