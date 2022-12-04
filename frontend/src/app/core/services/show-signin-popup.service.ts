import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShowSigninPopupService {

  private showSigninPopupSubject = new Subject<number>();

  showSigninPopupObservable$ = this.showSigninPopupSubject.asObservable();

  constructor() { }

  showSigninPopup() {
    this.showSigninPopupSubject.next(null);
  }
}
