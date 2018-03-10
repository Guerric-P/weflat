import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { RouterModule } from "@angular/router";
import { SimpleNotificationsModule } from "angular2-notifications";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule, 
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
