import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    this.swUpdate.available.subscribe(evt => {
      console.log('Update available');
      const snack = this.snackbar.open('Update Available', 'Reload');

      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });

      setTimeout(() => {
        snack.dismiss();
      }, 6000);
    });

    setInterval(() => {
      console.log('Starting update check');
      this.swUpdate.checkForUpdate().then(() => console.log('Update check done.'));
    }, 5000);
  }
}
