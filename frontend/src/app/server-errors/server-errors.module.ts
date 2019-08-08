import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorsRoutingModule } from './server-errors-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
