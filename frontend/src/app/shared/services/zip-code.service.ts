import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZipCodeClass } from '../../core/models/ZipCodeClass';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ZipCodeService {

  constructor(private http: HttpClient) { }

  getZipCodesStatus(zipCodes: ZipCodeClass[]): Observable<ZipCodeClass[]> {
    return this.http.post<ZipCodeClass[]>('/zip-codes/check-status', zipCodes);
  }

  searchZipCodes(query?: string): Observable<ZipCodeClass[]> {
    return this.http.get<ZipCodeClass[]>('/zip-codes/search', {params: {query: query ? query : ''}});
  }

  postZipCode(zipCode: ZipCodeClass): Observable<ZipCodeClass> {
    return this.http.post<ZipCodeClass>('/zip-codes', zipCode);
  }

  deleteZipCode(id: number): Observable<any> {
    return this.http.delete(`/zip-codes/${id}`);
  }

  patchZipCode(zipCode: ZipCodeClass, id: number): Observable<any> {
    return this.http.patch(`/zip-codes/${id}`, zipCode);
  }
}
