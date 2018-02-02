import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PositionClass } from 'app/models/PositionClass';

@Injectable()
export class PositionService {

  constructor(private http: HttpClient) { }

  getPositions(): Observable<PositionClass[]> {
    return this.http.get<PositionClass[]>('/backend/positions');
  }
}
