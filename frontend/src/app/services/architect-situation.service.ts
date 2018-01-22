import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ArchitectSituationClass } from 'app/models/ArchitectSituationClass';

@Injectable()
export class ArchitectSituationService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<ArchitectSituationClass[]> {
    return this.http.get<ArchitectSituationClass[]>('/architects/orders');
  }
}
