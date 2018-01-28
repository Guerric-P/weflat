import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { VisiteClass } from "app/models/visiteclass";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VisiteService {
    constructor(private http: HttpClient) { }

    postVisit(visite: VisiteClass){
        return this.http.post('/backend/visits', visite, { responseType: 'text'});
    }

    getAvailableVisits(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/backend/visits/available');
    }

    getPlannedVisits(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/backend/visits/planned');
    }

    getReportPendingVisites(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/backend/visits/report-pending');
    }

    getReportWrittenVisites(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/backend/visits/report-written');
    }

    acceptVisit(id: number): Observable<any> {
        return this.http.post('backend/visits/accept', null, {params: new HttpParams().set('id', id.toString())});
    }

    refuseVisit(id: number): Observable<any> {
        return this.http.post('backend/visits/refuse', null, {params: new HttpParams().set('id', id.toString())});
    }

    getVisitCounter(): Observable<number> {
        return this.http.get<number>('backend/visits/count');
    }
}