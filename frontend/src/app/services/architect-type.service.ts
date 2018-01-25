import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ArchitectTypeClass } from 'app/models/ArchitectTypeClass';

@Injectable()
export class ArchitectTypeService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<ArchitectTypeClass[]> {
    return this.http.get<ArchitectTypeClass[]>('/backend/architecte/types');
  }

}
