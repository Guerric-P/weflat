import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './components/customers/customers.component';
import { VisitsComponent } from './components/visits/visits/visits.component';
import { ArchitectsComponent } from './components/architects/architects/architects.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatInputModule, MatSlideToggleModule, MatListModule, MatDividerModule, MatExpansionModule, MatChipsModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ZipCodeComponent } from './components/zip-codes/zip-code/zip-code.component';
import { ZipCodesComponent } from './components/zip-codes/zip-codes/zip-codes.component';
import { ArchitectsListComponent } from './components/architects/architects-list/architects-list.component';
import { ArchitectDetailComponent } from './components/architects/architect-detail/architect-detail.component';
import { ArchitectComponent } from './components/architects/architect/architect.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatInputModule,
    MatSlideToggleModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatChipsModule,
    SharedModule
  ],
  declarations: [CustomersComponent, VisitsComponent, ArchitectsComponent, ZipCodesComponent, ZipCodeComponent, ArchitectsListComponent, ArchitectDetailComponent, ArchitectComponent]
})
export class AdminModule { }
