import { Injectable } from '@angular/core';
import { VisitClass } from '../models/VisitClass';

@Injectable()
export class SessionStorageService {

  private _place: any;
  private _visitInfos: any;
  private _visit: VisitClass;

  constructor() { }

  get place(): any {
    return this._place;
  }

  set place(place: any) {
    this._place = place;
  }

  get visit(): VisitClass {
    return this._visit;
  }

  set visit(visit: VisitClass) {
    this._visit = visit;
  }

  get visitInfos(): any {
    return this._visitInfos;
  }

  set visitInfos(visitInfos: any) {
    this._visitInfos = visitInfos;
  }

}
