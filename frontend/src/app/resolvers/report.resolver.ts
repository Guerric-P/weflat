import { Injectable } from "@angular/core";
import { ReportClass } from "app/models/ReportClass";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ReportService } from "app/services/report.service";

@Injectable()
export class ReportResolver implements Resolve<ReportClass> {
    

    constructor(private reportService: ReportService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ReportClass | Observable<ReportClass> | Promise<ReportClass> {
        return this.reportService.getByVisitId(route.params['id']);
    }

}