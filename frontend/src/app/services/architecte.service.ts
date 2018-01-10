import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { ZipCodeClass } from 'app/models/ZipCodeClass'

@Injectable()
export class ArchitecteService {

  constructor(private http: HttpClient) { }

  postZipCodes(zipCodes: ZipCodeClass[], id: number){
    return this.http.post('/backend/architecte/' + id + '/zipcodes', zipCodes);
  }

  getZipCodes(id: number): Observable<ZipCodeClass[]> {
    return this.http.get<ZipCodeClass[]>('/backend/architecte/' + id + '/zipcodes');
  }

}
