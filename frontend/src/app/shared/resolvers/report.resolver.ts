import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ReportService } from "../services/report.service";
import { ReportClass } from "../../core/models/ReportClass";

@Injectable()
export class ReportResolver implements Resolve<ReportClass> {
    

    constructor(private reportService: ReportService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ReportClass | Observable<ReportClass> | Promise<ReportClass> {
        return this.reportService.getByVisitId(route.params['id']);
    }

}