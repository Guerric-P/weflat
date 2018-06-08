import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ArchitectSituationService } from '../services/architect-situation.service';
import { ArchitectSituationClass } from '../../core/models/ArchitectSituationClass';

@Injectable()
export class ArchitectSituationResolver implements Resolve<ArchitectSituationClass[]> {

  constructor(private architectSituationService: ArchitectSituationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    ArchitectSituationClass[] | Observable<ArchitectSituationClass[]> | Promise<ArchitectSituationClass[]> {
    return this.architectSituationService.getAll();
  }

}
