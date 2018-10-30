import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ZipCodeClass } from '../../core/models/ZipCodeClass';
import { ArchitectService } from '../services/architecte.service';
import { AuthenticationService } from 'app/core/services/authentication.service';

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
