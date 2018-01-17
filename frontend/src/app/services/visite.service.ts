import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { VisiteClass } from "app/models/visiteclass";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VisiteService {
    constructor(private http: HttpClient) { }

    postVisite(visite: VisiteClass){
        return this.http.post('/backend/visits', visite, { responseType: 'text'});
    }

    getVisites(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/backend/visits');
    }

    getPlannedVisites(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/backend/visits/planned');
    }

    acceptVisite(id: number): Observable<any> {
        return this.http.post('backend/visits/accept', null, {params: new HttpParams().set('id', id.toString())});
    }

    refuseVisite(id: number): Observable<any> {
        return this.http.post('backend/visits/refuse', null, {params: new HttpParams().set('id', id.toString())});
    }

    getVisiteCounter(): Observable<number> {
        return this.http.get<number>('backend/visits/count');
    }
}