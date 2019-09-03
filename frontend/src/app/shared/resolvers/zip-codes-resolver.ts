import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ZipCodeClass } from '@weflat/core/models/ZipCodeClass';
import { ArchitectService } from '@weflat/shared/services/architecte.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class ZipCodesResolver implements Resolve<ZipCodeClass[]> {

    constructor(
        private architecteService: ArchitectService,
        private authService: AuthenticationService
        ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        ZipCodeClass[] | Observable<ZipCodeClass[]> | Promise<ZipCodeClass[]> {
        return this.architecteService.getZipCodes(this.authService.userId);
    }

}
