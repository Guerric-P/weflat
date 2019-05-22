import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { HttpClientXsrfModule, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    TransferHttpCacheModule,
    InterceptorsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
