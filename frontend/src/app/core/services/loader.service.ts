import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<any>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show(message?: string) {
    this.loaderSubject.next({ show: true, message: message });
  }
  hide() {
    this.loaderSubject.next({ show: false });
  }

}
