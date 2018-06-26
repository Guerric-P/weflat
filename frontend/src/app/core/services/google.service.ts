import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private mapLoadedBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  get isMapLoaded() {
    return this.mapLoadedBehaviorSubject.getValue();
  }

  addMapsScript(): boolean | Observable<boolean> {
    if (!this.isMapLoaded && !document.querySelectorAll(`[src="${environment.googleMapsUrl}"]`).length) {
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
          type: 'text/javascript',
          src: environment.googleMapsUrl,
          onload: () => this.mapLoadedBehaviorSubject.next(true)
        }));

      return this.mapLoadedBehaviorSubject.asObservable();
    } else if (!this.isMapLoaded && document.querySelectorAll(`[src="${environment.googleMapsUrl}"]`).length) {
      return this.mapLoadedBehaviorSubject.asObservable();
    } else {
      return this.isMapLoaded;
    }
  }

  executeAfterGoogleMapsIsLoaded(func: Function) {
    const booleanOrObservable = this.addMapsScript();

    if (booleanOrObservable instanceof Observable) {
      booleanOrObservable.subscribe(res => {
        if (res) {
          func();
        }
      });
    }
    else if (booleanOrObservable) {
      func();
    }
  }
}
