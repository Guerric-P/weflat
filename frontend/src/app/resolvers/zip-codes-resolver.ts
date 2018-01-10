import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ArchitecteService } from "app/services/architecte.service";
import { LocalStorageService } from "app/services/local-storage.service";
import { ZipCodeClass } from 'app/models/ZipCodeClass';

@Injectable()
export class ZipCodesResolver implements Resolve<ZipCodeClass[]> {

    constructor(private architecteService: ArchitecteService, private localStorageService:LocalStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ZipCodeClass[] | Observable<ZipCodeClass[]> | Promise<ZipCodeClass[]> {
        return this.architecteService.getZipCodes(this.localStorageService.tokenPayload.id);
    }

}
