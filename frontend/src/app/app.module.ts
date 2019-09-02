import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppComponent } from '@weflat/app.component';
import { CoreModule } from '@weflat/core/core.module';
import { InterceptorsModule } from '@weflat/interceptors/interceptors.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    TransferHttpCacheModule,
    InterceptorsModule
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
