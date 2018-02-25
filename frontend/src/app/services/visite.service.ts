import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { VisiteClass } from "app/models/visiteclass";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VisiteService {
    constructor(private http: HttpClient) { }

    post(visite: VisiteClass){
        return this.http.post<any>('/visits', visite);
    }

    completeCreation(visite: VisiteClass){
        return this.http.patch<any>(`/visits/${visite.id}`, visite);
    }

    pay(id: number, token: string){
        return this.http.post(`/visits/${id}/pay?token=${token}`, null);
    }

    getAvailableVisits(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architecte/${architectId}/visits/available`);
    }

    getPlannedVisits(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architecte/${architectId}/visits/planned`);
    }

    getReportPendingVisites(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architecte/${architectId}/visits/report-pending`);
    }

    getReportWrittenVisites(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architecte/${architectId}/visits/report-written`);
    }

    acceptVisit(id: number): Observable<any> {
        return this.http.post('/visits/accept', null, {params: new HttpParams().set('id', id.toString())});
    }

    refuseVisit(id: number): Observable<any> {
        return this.http.post('/visits/refuse', null, {params: new HttpParams().set('id', id.toString())});
    }

    getVisitCounter(): Observable<number> {
        return this.http.get<number>('/visits/count');
    }
}