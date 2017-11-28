import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArchitecteService {

  constructor(private http: HttpClient) { }

  postZipCodes(zipCodes: string[], id: number){
    return this.http.post('/backend/architecte/' + id + '/zipcodes', zipCodes);
  }

  getZipCodes(id: number) {
    return this.http.get('/backend/architecte/' + id + '/zipcodes');
  }

}
