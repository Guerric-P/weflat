import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { NotFoundComponent } from '@weflat/app/server-errors/not-found/not-found.component';
import { ServerErrorsRoutingModule } from '@weflat/app/server-errors/server-errors-routing.module';
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
