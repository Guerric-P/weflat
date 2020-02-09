import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchitectSituationClass } from '@weflat/app/core/models/ArchitectSituationClass';
import { Observable } from 'rxjs';

@Injectable()
export class ArchitectSituationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ArchitectSituationClass[]> {
    return this.http.get<ArchitectSituationClass[]>('/architects/situations');
  }
}
