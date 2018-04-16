import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AcheteurClass } from '../../core/models/AcheteurClass';

@Injectable()
export class AcheteurService {

  constructor(private http: HttpClient) { }

  postAcheteur(acheteur: AcheteurClass){
    return this.http.post('/acheteurs', acheteur);
  }

  getAcheteur(id: number): Observable<AcheteurClass> {
    return this.http.get<AcheteurClass>(`/acheteurs/${id}`);
  }

  patchAcheteur(acheteur: AcheteurClass, acheteurId: number){
    return this.http.patch(`/acheteurs/${acheteurId}`, acheteur);
  }

}
