import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { ArchitecteClass } from '../../core/models/ArchitecteClass';
import { ZipCodeClass } from '../../core/models/ZipCodeClass';

@Injectable()
export class ArchitecteService {

  constructor(private http: HttpClient) { }


  postArchitecte(architecte: ArchitecteClass) {
    return this.http.post<ArchitecteClass>('/architects', architecte).map(res => new ArchitecteClass(res));
  }

  patchArchitecte(architecte: ArchitecteClass, architecteId: number) {
    return this.http.patch<ArchitecteClass>(`/architects/${architecteId}`, architecte).map(res => new ArchitecteClass(res));
  }

  getArchitecte(id: number) {
    return this.http.get<ArchitecteClass>(`/architects/${id}`).map(res => new ArchitecteClass(res));
  }

  getAll() {
    return this.http.get<ArchitecteClass[]>('/architects').map(res => res.map(item => new ArchitecteClass(item)));
  }

  postZipCodes(zipCodes: ZipCodeClass[], id: number) {
    return this.http.post(`/architects/${id}/zip-codes`, zipCodes);
  }

  getZipCodes(id: number): Observable<ZipCodeClass[]> {
    return this.http.get<ZipCodeClass[]>(`/architects/${id}/zip-codes`);
  }

  accept(id: number): Observable<any> {
    return this.http.post(`/architects/${id}/accept`, null);
  }

  refuse(id: number): Observable<any> {
    return this.http.post(`/architects/${id}/refuse`, null);
  }
}
