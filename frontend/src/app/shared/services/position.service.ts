import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionClass } from '@weflat/app/core/models/PositionClass';
import { Observable } from 'rxjs';

@Injectable()
export class PositionService {

  constructor(private http: HttpClient) { }

  getPositions(): Observable<PositionClass[]> {
    return this.http.get<PositionClass[]>('/positions');
  }
}
