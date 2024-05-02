import { Injectable, Inject, PLATFORM_ID, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { interval } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
    @Inject(PLATFORM_ID) platformId: string,
    appRef: ApplicationRef
  ) {
    if (isPlatformBrowser(platformId)) {
      this.swUpdate.available.subscribe(() => {
        const snack = this.snackbar.open('Nouvelle version disponible', 'Actualiser');

        snack.onAction().subscribe(() => {
          window.location.reload();
        });

        setTimeout(() => {
          snack.dismiss();
        }, 6000);
      });

      // Poll logic after isStable, otherwise isStable never fires
      appRef.isStable.pipe(
        first(stable => stable),
        switchMap(() => interval(6 * 60 * 60 * 1000)) // Every 6h
      ).subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
    }
  }
}
