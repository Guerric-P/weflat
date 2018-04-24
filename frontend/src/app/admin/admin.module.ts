import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './components/customers/customers.component';
import { VisitsComponent } from './components/visits/visits.component';
import { ArchitectsComponent } from './components/architects/architects.component';
import { ZipCodesComponent } from './components/zip-codes/zip-codes.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatInputModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    SharedModule
  ],
  declarations: [CustomersComponent, VisitsComponent, ArchitectsComponent, ZipCodesComponent]
})
export class AdminModule { }
