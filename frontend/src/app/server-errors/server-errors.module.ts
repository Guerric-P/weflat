import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorsRoutingModule } from './server-errors-routing.module';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    ServerErrorsRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ServerErrorsModule { }
