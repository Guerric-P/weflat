import { enableProdMode, ReflectiveInjector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Constantes } from 'app/shared/common/Constantes';
import { TransferState } from '@angular/platform-browser';
import { initTransferState } from '@angular/platform-browser/src/browser/transfer_state';

if (environment.production) {
  enableProdMode();
}

const injector = ReflectiveInjector.resolveAndCreate([TransferState]);
const transferState = initTransferState(document, 'serverApp');

console.log('transferState', !!transferState);
console.log('transferState', transferState.hasKey(Constantes.SHOULD_NOT_LOAD_CLIENT));
// @ts-ignore
console.log('store', transferState.store);

if (!transferState.hasKey(Constantes.SHOULD_NOT_LOAD_CLIENT)) {
  document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(AppModule);
  });
}


