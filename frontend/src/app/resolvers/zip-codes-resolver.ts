import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ArchitecteService } from "app/services/architecte.service";
import { LocalStorageService } from "app/services/local-storage.service";

@Injectable()
export class ZipCodesResolver implements Resolve<string[]> {

    constructor(private architecteService: ArchitecteService, private localStorageService:LocalStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string[] | Observable<string[]> | Promise<string[]> {
        return this.architecteService.getZipCodes(this.localStorageService.tokenPayload.id);
    }

}
