import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private mapLoadedBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  get isMapLoaded() {
    return this.mapLoadedBehaviorSubject.getValue();
  }

  addMapsScript() {
    if (!this.isMapLoaded && !document.querySelectorAll(`[src="${environment.googleMapsUrl}"]`).length) {
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
          type: 'text/javascript',
          src: environment.googleMapsUrl,
          onload: () => this.mapLoadedBehaviorSubject.next(true)
        }));
    }
  }


  loadGoogleMapsLibrary() {
    this.addMapsScript();
    return this.mapLoadedBehaviorSubject.asObservable().pipe(
      filter(x => x)
    );
  }
}
