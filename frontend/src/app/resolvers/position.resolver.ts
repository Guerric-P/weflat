import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PositionClass } from 'app/models/PositionClass';
import { PositionService } from 'app/services/position.service';

@Injectable()
export class PositionResolver implements Resolve<PositionClass[]> {

  constructor(private positionService: PositionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PositionClass[] | Observable<PositionClass[]> | Promise<PositionClass[]> {
    return this.positionService.getPositions();
  }


}
