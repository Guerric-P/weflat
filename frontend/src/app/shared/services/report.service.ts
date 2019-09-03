import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportClass } from '@weflat/core/models/ReportClass';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  getByVisitId(visitId: number): Observable<ReportClass> {
    return this.http.get<ReportClass>(`/visits/${visitId}/report`).pipe(map(res => new ReportClass(res)));
  }

  postReport(visitId: number, report: ReportClass): Observable<ReportClass> {
    return this.http.post(`/visits/${visitId}/report`, report).pipe(map(res => new ReportClass(res)));
  }

  patchReport(visitId: number, report: ReportClass): Observable<ReportClass> {
    return this.http.patch(`/visits/${visitId}/report`, report).pipe(map(res => new ReportClass(res)));
  }

  submitReport(visitId: number): Observable<any> {
    return this.http.post(`/visits/${visitId}/report/submit`, null);
  }
}
