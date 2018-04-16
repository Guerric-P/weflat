import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { ArchitecteClass } from '../../core/models/ArchitecteClass';
import { ZipCodeClass } from '../../core/models/ZipCodeClass';

@Injectable()
export class ArchitecteService {

  constructor(private http: HttpClient) { }


  postArchitecte(architecte: ArchitecteClass){
    return this.http.post('/architectes', architecte);
  }

  patchArchitecte(architecte: ArchitecteClass, architecteId: number){
    return this.http.patch(`/architectes/${architecteId}`, architecte);
  }

  getArchitecte(id: number){
    return this.http.get<ArchitecteClass>(`/architectes/${id}`);
  }

  postZipCodes(zipCodes: ZipCodeClass[], id: number){
    return this.http.post(`/architectes/${id}/zipcodes`, zipCodes);
  }

  getZipCodes(id: number): Observable<ZipCodeClass[]> {
    return this.http.get<ZipCodeClass[]>(`/architectes/${id}/zipcodes`);
  }
}
