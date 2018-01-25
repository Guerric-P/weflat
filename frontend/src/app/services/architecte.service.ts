import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { ZipCodeClass } from 'app/models/ZipCodeClass'
import { ArchitecteClass } from 'app/models/ArchitecteClass';

@Injectable()
export class ArchitecteService {

  constructor(private http: HttpClient) { }


  postArchitecte(architecte: ArchitecteClass){
    return this.http.post('/backend/architecte', architecte, { responseType: 'text'});
  }

  patchArchitecte(architecte: ArchitecteClass){
    return this.http.patch('/backend/architecte', architecte, { responseType: 'text'});
  }

  postZipCodes(zipCodes: ZipCodeClass[], id: number){
    return this.http.post('/backend/architecte/' + id + '/zipcodes', zipCodes);
  }

  getZipCodes(id: number): Observable<ZipCodeClass[]> {
    return this.http.get<ZipCodeClass[]>('/backend/architecte/' + id + '/zipcodes');
  }

}
