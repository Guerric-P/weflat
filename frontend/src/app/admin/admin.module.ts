import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './components/customers/customers.component';
import { VisitsComponent } from './components/visits/visits.component';
import { ArchitectsComponent } from './components/architects/architects.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatInputModule, MatSlideToggleModule, MatListModule, MatDividerModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ZipCodeComponent } from './components/zip-codes/zip-code/zip-code.component';
import { ZipCodesComponent } from './components/zip-codes/zip-codes/zip-codes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatInputModule,
    MatSlideToggleModule,
    MatListModule,
    MatDividerModule,
    SharedModule
  ],
  declarations: [CustomersComponent, VisitsComponent, ArchitectsComponent, ZipCodesComponent, ZipCodeComponent]
})
export class AdminModule { }
