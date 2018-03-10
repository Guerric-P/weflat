import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { RouterModule } from "@angular/router";
import { SimpleNotificationsModule } from "angular2-notifications";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [
    CoreModule,
    BrowserModule,
    RouterModule,
    SimpleNotificationsModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
