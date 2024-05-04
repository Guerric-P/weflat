import { NgModule, } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from '@weflat/app/app.component';
import { AppModule } from '@weflat/app/app.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule
],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
