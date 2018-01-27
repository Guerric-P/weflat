import { Injectable } from '@angular/core';
import { ArchitectSituationClass } from 'app/models/ArchitectSituationClass';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ArchitectSituationService } from 'app/services/architect-situation.service';

@Injectable()
export class ArchitectSituationResolver implements Resolve<ArchitectSituationClass[]> {

  constructor(private architectSituationService: ArchitectSituationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ArchitectSituationClass[] | Observable<ArchitectSituationClass[]> | Promise<ArchitectSituationClass[]> {
    return this.architectSituationService.getSituations();
  }

}
