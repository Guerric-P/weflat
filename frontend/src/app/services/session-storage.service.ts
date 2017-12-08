import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

  private _place: any;

  constructor() { }

  get place() {
    return this._place;
  }

  set place(place) {
    this._place = place;
  }

}
