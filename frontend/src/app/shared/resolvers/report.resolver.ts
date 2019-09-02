import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ReportClass } from '@weflat/core/models/ReportClass';
import { ReportService } from '@weflat/shared/services/report.service';
import { Observable } from 'rxjs';

@Injectable()
export class ReportResolver implements Resolve<ReportClass> {


    constructor(private reportService: ReportService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ReportClass | Observable<ReportClass> | Promise<ReportClass> {
        return this.reportService.getByVisitId(route.params['id']);
    }

}
