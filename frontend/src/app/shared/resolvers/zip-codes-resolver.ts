import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ZipCodeClass } from '@weflat/app/core/models/ZipCodeClass';
import { AuthenticationService } from '@weflat/app/core/services/authentication.service';
import { ArchitectService } from '@weflat/app/shared/services/architecte.service';
import { Observable } from 'rxjs';

@Injectable()
export class ZipCodesResolver  {

    constructor(
        private architecteService: ArchitectService,
        private authService: AuthenticationService
        ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        ZipCodeClass[] | Observable<ZipCodeClass[]> | Promise<ZipCodeClass[]> {
        return this.architecteService.getZipCodes(this.authService.userId);
    }

}
