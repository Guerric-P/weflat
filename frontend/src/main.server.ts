import { enableProdMode } from '@angular/core';
import { environment } from '@weflat/environments/environment';

if (environment.production) {
  enableProdMode();
}
// Import module map for lazy loading
export { AppServerModule } from './app/app.server.module';



