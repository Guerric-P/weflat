import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AcheteurClass } from 'app/models/AcheteurClass';

@Injectable()
export class AcheteurService {

  constructor(private http: HttpClient) { }

  postAcheteur(acheteur: AcheteurClass){
    return this.http.post('/backend/acheteur', acheteur, { responseType: 'text'});
  }

}
