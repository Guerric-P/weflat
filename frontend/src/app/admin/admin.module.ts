import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminRoutingModule } from '@weflat/admin/admin-routing.module';
import { ArchitectListItemComponent } from '@weflat/admin/components/architects/architect/architect-list-item.component';
import { ArchitectsListComponent } from '@weflat/admin/components/architects/architects-list/architects-list.component';
import { ArchitectsComponent } from '@weflat/admin/components/architects/architects/architects.component';
import { ArchitectComponent } from '@weflat/admin/components/common/architect/architect.component';
import { CustomerComponent } from '@weflat/admin/components/common/customer/customer.component';
import { VisitComponent } from '@weflat/admin/components/common/visit/visit.component';
import { CustomersComponent } from '@weflat/admin/components/customers/customers.component';
import { VisitListItemComponent } from '@weflat/admin/components/visits/visit/visit-list-item.component';
import { VisitsListComponent } from '@weflat/admin/components/visits/visits-list/visits-list.component';
import { VisitsComponent } from '@weflat/admin/components/visits/visits/visits.component';
import { ZipCodeComponent } from '@weflat/admin/components/zip-codes/zip-code/zip-code.component';
import { ZipCodesComponent } from '@weflat/admin/components/zip-codes/zip-codes/zip-codes.component';
import { SharedModule } from '@weflat/shared/shared.module';


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
