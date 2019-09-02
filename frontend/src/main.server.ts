import { enableProdMode } from '@angular/core';
import { environment } from 'environments/environment';

if (environment.production) {
  enableProdMode();
}

// Express Engine
export { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
export { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
export { AppServerModule } from './app/app.server.module';



