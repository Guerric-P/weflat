import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchitecteClass } from 'app/models/ArchitecteClass';
import { AcheteurClass } from 'app/models/AcheteurClass';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }

  postArchitecte(architecte: ArchitecteClass){
    return this.http.post('/backend/user/architecte', architecte, { responseType: 'text'});
  }

  postAcheteur(acheteur: AcheteurClass){
    return this.http.post('/backend/user/acheteur', acheteur, { responseType: 'text'});
  }

}
