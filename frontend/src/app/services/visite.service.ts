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

    getAvailableVisitsByArchitect(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architecte/${architectId}/visits/available`);
    }

    getPlannedVisitsByArchitect(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architecte/${architectId}/visits/planned`);
    }

    getReportPendingVisitsByArchitect(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architecte/${architectId}/visits/report-pending`);
    }

    getReportWrittenVisitsByArchitect(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architecte/${architectId}/visits/report-written`);
    }

    getWaitingForPaymentVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/acheteur/${acheteurId}/visits/waiting-for-payment`);
    }

    getBeingAssignedVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/acheteur/${acheteurId}/visits/being-assigned`);
    }

    getInProgressVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/acheteur/${acheteurId}/visits/in-progress`);
    }

    getReportBeingWrittenVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/acheteur/${acheteurId}/visits/report-being-written`);
    }

    getReportWrittenVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/acheteur/${acheteurId}/visits/report-written`);
    }

    getPlannedVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/acheteur/${acheteurId}/visits/planned`);
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