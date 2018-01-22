import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchitecteClass } from 'app/models/ArchitecteClass';
import { AcheteurClass } from 'app/models/AcheteurClass';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }

  postArchitecte(architecte: ArchitecteClass){
    return this.http.post('/backend/architecte', architecte, { responseType: 'text'});
  }

  postAcheteur(acheteur: AcheteurClass){
    return this.http.post('/backend/acheteur', acheteur, { responseType: 'text'});
  }

}
