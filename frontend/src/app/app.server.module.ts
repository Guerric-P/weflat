import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppComponent } from '@weflat/app.component';
import { AppModule } from '@weflat/app.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
