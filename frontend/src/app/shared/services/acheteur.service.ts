import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerClass } from '@weflat/core/models/CustomerClass';
import { Observable } from 'rxjs';

@Injectable()
export class AcheteurService {

  constructor(private http: HttpClient) { }

  postAcheteur(acheteur: CustomerClass) {
    return this.http.post('/customers', acheteur);
  }

  getAcheteur(id: number): Observable<CustomerClass> {
    return this.http.get<CustomerClass>(`/customers/${id}`);
  }

  patchAcheteur(acheteur: CustomerClass, acheteurId: number) {
    return this.http.patch(`/customers/${acheteurId}`, acheteur);
  }

}
