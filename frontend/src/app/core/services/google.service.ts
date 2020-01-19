import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@weflat/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private mapLoadedBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

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
    if (this.isBrowser) {
      this.addMapsScript();
    }
    return this.mapLoadedBehaviorSubject.asObservable().pipe(
      filter(x => x)
    );
  }
}
