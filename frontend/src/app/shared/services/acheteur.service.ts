import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CustomerClass } from '../../core/models/CustomerClass';

@Injectable()
export class AcheteurService {

  constructor(private http: HttpClient) { }

  postAcheteur(acheteur: CustomerClass){
    return this.http.post('/customers', acheteur);
  }

  getAcheteur(id: number): Observable<CustomerClass> {
    return this.http.get<CustomerClass>(`/customers/${id}`);
  }

  patchAcheteur(acheteur: CustomerClass, acheteurId: number){
    return this.http.patch(`/customers/${acheteurId}`, acheteur);
  }

}
