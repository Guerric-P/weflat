import { Injectable, Inject, PLATFORM_ID, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';
import { first, tap, switchMap } from 'rxjs/operators';
import { interval } from 'rxjs';

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
        console.log('Update available');
        const snack = this.snackbar.open('Nouvelle version disponible', 'Actualiser');

        snack
          .onAction()
          .subscribe(() => {
            console.log('Reload');
            window.location.reload();
          });

        setTimeout(() => {
          snack.dismiss();
        }, 6000);
      });

      appRef.isStable.pipe(
        first(stable => stable),
        tap(stable => console.log('App is stable now')),
        switchMap(() => interval(5000))
      ).subscribe(() => {
        console.log('Starting update check');
        this.swUpdate.checkForUpdate().then(() => console.log('Update check done.'));
      });
    }
  }
}
