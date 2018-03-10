import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PositionClass } from '../../core/models/PositionClass';

@Injectable()
export class PositionService {

  constructor(private http: HttpClient) { }

  getPositions(): Observable<PositionClass[]> {
    return this.http.get<PositionClass[]>('/positions');
  }
}
