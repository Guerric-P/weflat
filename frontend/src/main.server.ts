import { enableProdMode } from '@angular/core';
import { environment } from '@weflat/environments';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';

