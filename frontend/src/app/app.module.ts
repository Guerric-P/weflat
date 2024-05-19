import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from '@weflat/app/app.component';
import { CoreModule } from '@weflat/app/core/core.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { csrfInterceptor } from './interceptors/csrf-interceptor.service';
import { weflatInterceptor } from './interceptors/http-interceptor.service';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    },
    provideClientHydration(withHttpTransferCacheOptions({})),
    provideHttpClient(withFetch(), withInterceptors([csrfInterceptor, weflatInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
