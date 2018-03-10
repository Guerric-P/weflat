import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ArchitectTypeService } from '../services/architect-type.service';
import { ArchitectTypeClass } from '../../core/models/ArchitectTypeClass';

@Injectable()
export class ArchitectTypeResolver implements Resolve<ArchitectTypeClass[]> {

  constructor(private architectTypeService: ArchitectTypeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ArchitectTypeClass[] | Observable<ArchitectTypeClass[]> | Promise<ArchitectTypeClass[]> {
    return this.architectTypeService.getTypes();
  }

}
