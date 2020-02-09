import { XhrFactory } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppComponent } from '@weflat/app/app.component';
import { AppModule } from '@weflat/app/app.module';
import * as xhr2 from 'xhr2';

// activate cookie for server-side rendering
export class ServerXhr implements XhrFactory {
  build(): XMLHttpRequest {
    xhr2.prototype._restrictedHeaders.cookie = false;
    return new xhr2.XMLHttpRequest();
  }
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
],
  providers: [{ provide: XhrFactory, useClass: ServerXhr }],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
