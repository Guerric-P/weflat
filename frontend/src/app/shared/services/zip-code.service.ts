import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZipCodeClass } from '../../core/models/ZipCodeClass';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ZipCodeService {

  constructor(private http: HttpClient) { }

  getZipCodesStatus(zipCodes: ZipCodeClass[]): Observable<ZipCodeClass[]> {
    return this.http.post<ZipCodeClass[]>('/zipcodes/check-status', zipCodes);
  }

  searchZipCodes(query: string): Observable<ZipCodeClass[]> {
    return this.http.get<ZipCodeClass[]>('/zipcodes/search', {params: {query: query}});
  }
}
