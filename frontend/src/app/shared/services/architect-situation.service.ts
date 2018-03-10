import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ArchitectSituationClass } from '../../core/models/ArchitectSituationClass';

@Injectable()
export class ArchitectSituationService {

  constructor(private http: HttpClient) { }

  getSituations(): Observable<ArchitectSituationClass[]> {
    return this.http.get<ArchitectSituationClass[]>('/architecte/situations');
  }
}
