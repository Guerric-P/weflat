import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ArchitectSituationClass } from '@weflat/core/models/ArchitectSituationClass';
import { ArchitectSituationService } from '@weflat/shared/services/architect-situation.service';
import { Observable } from 'rxjs';

@Injectable()
export class ArchitectSituationResolver implements Resolve<ArchitectSituationClass[]> {

  constructor(private architectSituationService: ArchitectSituationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    ArchitectSituationClass[] | Observable<ArchitectSituationClass[]> | Promise<ArchitectSituationClass[]> {
    return this.architectSituationService.getAll();
  }

}
