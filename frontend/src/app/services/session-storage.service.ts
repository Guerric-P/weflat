import { Injectable } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';

@Injectable()
export class SessionStorageService {

  private _place: any;
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

}
