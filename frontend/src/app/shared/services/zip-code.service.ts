import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZipCodeClass } from '../../core/models/ZipCodeClass';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ZipCodeService {

  constructor(private http: HttpClient) { }

  getZipCodesdetails(zipCodes: ZipCodeClass[]): Observable<ZipCodeClass[]> {
    return this.http.post<ZipCodeClass[]>('/zip-codes/details', zipCodes).pipe(
      map(res => res.map(x => new ZipCodeClass(x)))
    );
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
