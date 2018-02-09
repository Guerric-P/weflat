import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { ZipCodeClass } from 'app/models/ZipCodeClass'
import { ArchitecteClass } from 'app/models/ArchitecteClass';

@Injectable()
export class ArchitecteService {

  constructor(private http: HttpClient) { }


  postArchitecte(architecte: ArchitecteClass){
    return this.http.post('/architecte', architecte, { responseType: 'text'});
  }

  patchArchitecte(architecte: ArchitecteClass){
    return this.http.patch('/architecte', architecte, { responseType: 'text'});
  }

  getArchitecte(){
    return this.http.get<ArchitecteClass>('/architecte');
  }

  postZipCodes(zipCodes: ZipCodeClass[], id: number){
    return this.http.post('/architecte/' + id + '/zipcodes', zipCodes);
  }

  getZipCodes(id: number): Observable<ZipCodeClass[]> {
    return this.http.get<ZipCodeClass[]>('/architecte/' + id + '/zipcodes');
  }

}
