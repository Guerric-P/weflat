import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './components/customers/customers.component';
import { VisitsComponent } from './components/visits/visits/visits.component';
import { ArchitectsComponent } from './components/architects/architects/architects.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatInputModule, MatSlideToggleModule, MatListModule, MatDividerModule, MatExpansionModule, MatChipsModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ZipCodeComponent } from './components/zip-codes/zip-code/zip-code.component';
import { ZipCodesComponent } from './components/zip-codes/zip-codes/zip-codes.component';
import { ArchitectsListComponent } from './components/architects/architects-list/architects-list.component';
import { VisitListItemComponent } from './components/visits/visit/visit-list-item.component';
import { VisitsListComponent } from './components/visits/visits-list/visits-list.component';
import { CustomerComponent } from './components/common/customer/customer.component';
import { ArchitectListItemComponent } from './components/architects/architect/architect-list-item.component';
import { ArchitectComponent } from './components/common/architect/architect.component';
import { VisitComponent } from './components/common/visit/visit.component';

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
    MatButtonModule,
    MatDialogModule,
    SharedModule
  ],
  declarations: [
    CustomersComponent,
    VisitsComponent,
    ArchitectsComponent,
    ZipCodesComponent,
    ZipCodeComponent,
    ArchitectsListComponent,
    ArchitectListItemComponent,
    ArchitectComponent,
    VisitListItemComponent,
    VisitsListComponent,
    VisitComponent,
    CustomerComponent
  ]
})
export class AdminModule { }
