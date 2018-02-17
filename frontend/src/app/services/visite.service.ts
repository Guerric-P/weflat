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
        return this.http.patch(`/visits/${visite.id}/complete`, visite);
    }

    pay(id: number, token: string){
        return this.http.post(`/visits/${id}/pay?token=${token}`, null);
    }

    getAvailableVisits(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/visits/available');
    }

    getPlannedVisits(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/visits/planned');
    }

    getReportPendingVisites(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/visits/report-pending');
    }

    getReportWrittenVisites(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/visits/report-written');
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