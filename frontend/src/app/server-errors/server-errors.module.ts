import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { NotFoundComponent } from '@weflat/server-errors/not-found/not-found.component';
import { ServerErrorsRoutingModule } from '@weflat/server-errors/server-errors-routing.module';

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
