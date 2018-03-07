import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AcheteurClass } from 'app/models/AcheteurClass';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AcheteurService {

  constructor(private http: HttpClient) { }

  postAcheteur(acheteur: AcheteurClass){
    return this.http.post('/acheteur', acheteur);
  }

  getAcheteur(id: number): Observable<AcheteurClass> {
    return this.http.get<AcheteurClass>(`/acheteur/${id}`);
  }

  patchAcheteur(acheteur: AcheteurClass, acheteurId: number){
    return this.http.patch(`/acheteur/${acheteurId}`, acheteur);
  }

}
