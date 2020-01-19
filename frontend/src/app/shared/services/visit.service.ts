import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VisitClass } from '@weflat/app/core/models/VisitClass';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class VisitService {
    private priceSubject: BehaviorSubject<number>;
    private partialRefundAmountSubject: BehaviorSubject<number>;
    private priceSubjectReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private partialRefundAmountSubjectReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        // Cache price and partial refund amount
        this.refreshPrice();
        this.refreshPartialRefundAmount();
    }

    post(visit: VisitClass) {
        return this.http.post<VisitClass>('/visits', visit).pipe(map(res => new VisitClass(res)));
    }

    getAll(): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>('/visits').pipe(
            map(res => res.map(item => new VisitClass(item)))
        );
    }

    patch(visit: VisitClass, id: number) {
        return this.http.patch<VisitClass>(`/visits/${id}`, visit).pipe(map(res => new VisitClass(res)));
    }

    pay(id: number, token: string): Observable<VisitClass> {
        return this.http.post<VisitClass>(`/visits/${id}/pay`, null, { params: { token: token } }).pipe(
            map(res => new VisitClass(res))
        );
    }

    cancel(id: number): Observable<VisitClass> {
        return this.http.post<VisitClass>(`/visits/${id}/cancel`, null).pipe(
            map(res => new VisitClass(res))
        );
    }

    architectPaid(id: number): Observable<VisitClass> {
        return this.http.post<VisitClass>(`/visits/${id}/architect-was-paid`, null).pipe(
            map(res => new VisitClass(res))
        );
    }

    getAvailableVisitsByArchitect(architectId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/architects/${architectId}/visits/available`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getPlannedVisitsByArchitect(architectId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/architects/${architectId}/visits/planned`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getReportPendingVisitsByArchitect(architectId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/architects/${architectId}/visits/report-pending`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getReportWrittenVisitsByArchitect(architectId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/architects/${architectId}/visits/report-written`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getWaitingForPaymentVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/waiting-for-payment`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getBeingAssignedVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/being-assigned`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getInProgressVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/in-progress`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getReportBeingWrittenVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/report-being-written`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getReportWrittenVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/report-written`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getPlannedVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/planned`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
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

    refreshPrice() {
        this.http.get<number>('/visits/price').subscribe(res => {
            if (!this.priceSubject) {
                this.priceSubject = new BehaviorSubject<number>(res);
                this.priceSubjectReady.next(true);
            } else {
                this.priceSubject.next(res);
            }
        });
    }

    getPrice(): Observable<Observable<number>> {
        return this.priceSubjectReady.pipe(
            filter(x => x),
            map(() => this.priceSubject.asObservable())
        );
    }

    refreshPartialRefundAmount() {
        this.http.get<number>('/visits/partial-refund-amount').subscribe(res => {
            if (!this.partialRefundAmountSubject) {
                this.partialRefundAmountSubject = new BehaviorSubject<number>(res);
                this.partialRefundAmountSubjectReady.next(true);
            } else {
                this.partialRefundAmountSubject.next(res);
            }
        });
    }

    getPartialRefundAmount(): Observable<Observable<number>> {
        return this.partialRefundAmountSubjectReady.pipe(
            filter(x => x),
            map(() => this.partialRefundAmountSubject.asObservable())
        );
    }
}
