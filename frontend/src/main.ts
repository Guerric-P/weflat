import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([{provide: LOCALE_ID, useValue: 'fr-FR'}]).bootstrapModule(AppModule, { providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] });
