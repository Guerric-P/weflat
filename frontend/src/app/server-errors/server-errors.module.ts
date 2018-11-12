import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorsRoutingModule } from './server-errors-routing.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    ServerErrorsRoutingModule
  ]
})
export class ServerErrorsModule { }
