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
import { VisitComponent } from './components/visits/visit/visit.component';
import { VisitDetailComponent } from './components/visits/visit-detail/visit-detail.component';
import { VisitsListComponent } from './components/visits/visits-list/visits-list.component';

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
    MatDividerModule,
    SharedModule
  ],
  declarations: [CustomersComponent, VisitsComponent, ArchitectsComponent, ZipCodesComponent, ZipCodeComponent, ArchitectsListComponent, ArchitectDetailComponent, ArchitectComponent, VisitComponent, VisitDetailComponent, VisitsListComponent]
})
export class AdminModule { }
