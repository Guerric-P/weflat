import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ArchitectTypeClass } from '@weflat/app/core/models/ArchitectTypeClass';
import { ArchitectTypeService } from '@weflat/app/shared/services/architect-type.service';
import { Observable } from 'rxjs';

@Injectable()
export class ArchitectTypeResolver implements Resolve<ArchitectTypeClass[]> {

  constructor(private architectTypeService: ArchitectTypeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    ArchitectTypeClass[] | Observable<ArchitectTypeClass[]> | Promise<ArchitectTypeClass[]> {
    return this.architectTypeService.getAll();
  }

}
