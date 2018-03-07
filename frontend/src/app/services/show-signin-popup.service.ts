import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShowSigninPopupService {

  constructor() { }

  private showSigninPopupSubject = new Subject<number>();

  showSigninPopupObservable$ = this.showSigninPopupSubject.asObservable();

  showSigninPopup() {
    this.showSigninPopupSubject.next();
  }
}
