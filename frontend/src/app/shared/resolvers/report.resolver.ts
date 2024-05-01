import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReportClass } from '@weflat/app/core/models/ReportClass';
import { ReportService } from '@weflat/app/shared/services/report.service';
import { Observable } from 'rxjs';

@Injectable()
export class ReportResolver  {


    constructor(private reportService: ReportService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ReportClass | Observable<ReportClass> | Promise<ReportClass> {
        return this.reportService.getByVisitId(route.params['id']);
    }

}
