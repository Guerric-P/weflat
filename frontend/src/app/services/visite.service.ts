import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { VisiteClass } from "app/models/visiteclass";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VisiteService {
    constructor(private http: HttpClient) { }

    postVisite(visite: VisiteClass){
        return this.http.post('/backend/visit', visite, { responseType: 'text'});
    }

    getVisites(): Observable<VisiteClass[]> {
        return this.http.get<VisiteClass[]>('/backend/visit');
    }
}