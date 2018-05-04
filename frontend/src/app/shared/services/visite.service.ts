import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { VisiteClass } from "../../core/models/VisiteClass";

@Injectable()
export class VisiteService {
    constructor(private http: HttpClient) { }

    post(visite: VisiteClass){
        return this.http.post<any>('/visits', visite);
    }

    getAll(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/visits').map(res => res.map(item => new VisiteClass(item)));
    }

    completeCreation(visite: VisiteClass){
        return this.http.patch<any>(`/visits/${visite.id}`, visite);
    }

    pay(id: number, token: string){
        return this.http.post(`/visits/${id}/pay`, null, {params: {token: token}});
    }

    cancel(id: number){
        return this.http.post(`/visits/${id}/cancel`, null);
    }

    getAvailableVisitsByArchitect(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architects/${architectId}/visits/available`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    getPlannedVisitsByArchitect(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architects/${architectId}/visits/planned`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    getReportPendingVisitsByArchitect(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architects/${architectId}/visits/report-pending`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    getReportWrittenVisitsByArchitect(architectId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/architects/${architectId}/visits/report-written`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    getWaitingForPaymentVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/customers/${acheteurId}/visits/waiting-for-payment`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    getBeingAssignedVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/customers/${acheteurId}/visits/being-assigned`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    getInProgressVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/customers/${acheteurId}/visits/in-progress`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    getReportBeingWrittenVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/customers/${acheteurId}/visits/report-being-written`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    getReportWrittenVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/customers/${acheteurId}/visits/report-written`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    getPlannedVisitsByAcheteur(acheteurId: number): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>(`/customers/${acheteurId}/visits/planned`).map(res => {
            return res.map(x => new VisiteClass(x));
        });
    }

    acceptVisit(id: number): Observable<any> {
        return this.http.post(`/visits/${id}/accept`, null);
    }

    refuseVisit(id: number): Observable<any> {
        return this.http.post(`/visits/${id}/refuse`, null);
    }

    getVisitCounter(): Observable<number> {
        return this.http.get<number>('/visits/count');
    }
}