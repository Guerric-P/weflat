import { Injectable } from '@angular/core';
import { ReportClass } from 'app/models/ReportClass';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  getByVisitId(visitId: number) {
    return this.http.get<ReportClass>(`/backend/visits/${visitId}/report`);
  }

}
