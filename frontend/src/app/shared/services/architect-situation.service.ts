import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ArchitectSituationClass } from '../../core/models/ArchitectSituationClass';

@Injectable()
export class ArchitectSituationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ArchitectSituationClass[]> {
    return this.http.get<ArchitectSituationClass[]>('/architectes/situations');
  }
}
