import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AcheteurClass } from '../../core/models/AcheteurClass';

@Injectable()
export class AcheteurService {

  constructor(private http: HttpClient) { }

  postAcheteur(acheteur: AcheteurClass){
    return this.http.post('/customers', acheteur);
  }

  getAcheteur(id: number): Observable<AcheteurClass> {
    return this.http.get<AcheteurClass>(`/customers/${id}`);
  }

  patchAcheteur(acheteur: AcheteurClass, acheteurId: number){
    return this.http.patch(`/customers/${acheteurId}`, acheteur);
  }

}
