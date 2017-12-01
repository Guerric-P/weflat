import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';

@Injectable()
export class ArchitecteService {

  constructor(private http: HttpClient) { }

  postZipCodes(zipCodes: string[], id: number){
    return this.http.post('/backend/architecte/' + id + '/zipcodes', zipCodes);
  }

  getZipCodes(id: number): Observable<string[]> {
    return this.http.get<string[]>('/backend/architecte/' + id + '/zipcodes');
  }

}
