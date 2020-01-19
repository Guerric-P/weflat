import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchitectTypeClass } from '@weflat/app/core/models/ArchitectTypeClass';
import { Observable } from 'rxjs';

@Injectable()
export class ArchitectTypeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ArchitectTypeClass[]> {
    return this.http.get<ArchitectTypeClass[]>('/architects/types');
  }

}
