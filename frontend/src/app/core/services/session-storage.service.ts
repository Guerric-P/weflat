import { Injectable } from '@angular/core';
import { VisiteClass } from '../models/VisiteClass';

@Injectable()
export class SessionStorageService {

  private _place: any;
  private _visitInfos: any;
  private _visit: VisiteClass;

  constructor() { }

  get place(): any {
    return this._place;
  }

  set place(place: any) {
    this._place = place;
  }

  get visit(): VisiteClass {
    return this._visit;
  }

  set visit(visit: VisiteClass) {
    this._visit = visit;
  }

  get visitInfos(): any {
    return this._visitInfos;
  }

  set visitInfos(visitInfos: any) {
    this._visitInfos = visitInfos;
  }

}
