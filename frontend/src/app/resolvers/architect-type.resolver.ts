import { Injectable } from '@angular/core';
import { ArchitectTypeClass } from 'app/models/ArchitectTypeClass';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ArchitectTypeService } from 'app/services/architect-type.service';

@Injectable()
export class ArchitectTypeResolver implements Resolve<ArchitectTypeClass[]> {

  constructor(private architectTypeService: ArchitectTypeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ArchitectTypeClass[] | Observable<ArchitectTypeClass[]> | Promise<ArchitectTypeClass[]> {
    return this.architectTypeService.getTypes();
  }

}
