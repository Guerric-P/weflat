import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Visite } from "app/models/visite";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VisiteService {
    constructor(private http: HttpClient) { }

    postVisite(visite: Visite){
        return this.http.post('/backend/visit', visite, { responseType: 'text'});
    }

    getVisites(): Observable<Visite[]> {
        return this.http.get<Visite[]>('/backend/visit');
    }
}