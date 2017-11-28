import { Injectable } from '@angular/core';
import { Architecte } from 'app/models/architecte';
import { Acheteur } from 'app/models/acheteur';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }

  postArchitecte(architecte: Architecte){
    return this.http.post('/backend/user/architecte', architecte, { responseType: 'text'});
  }

  postAcheteur(acheteur: Acheteur){
    return this.http.post('/backend/user/acheteur', acheteur, { responseType: 'text'});
  }

}
