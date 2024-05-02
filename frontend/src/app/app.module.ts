import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from '@weflat/app/app.component';
import { CoreModule } from '@weflat/app/core/core.module';
import { InterceptorsModule } from '@weflat/app/interceptors/interceptors.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    InterceptorsModule,
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
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
