import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PositionClass } from '@weflat/app/core/models/PositionClass';
import { PositionService } from '@weflat/app/shared/services/position.service';
import { Observable } from 'rxjs';

@Injectable()
export class PositionResolver  {

  constructor(private positionService: PositionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    PositionClass[] | Observable<PositionClass[]> | Promise<PositionClass[]> {
    return this.positionService.getPositions();
  }


}
