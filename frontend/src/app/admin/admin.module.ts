import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from '@weflat/app/admin/admin-routing.module';
import { ArchitectListItemComponent } from '@weflat/app/admin/components/architects/architect/architect-list-item.component';
import { ArchitectsListComponent } from '@weflat/app/admin/components/architects/architects-list/architects-list.component';
import { ArchitectsComponent } from '@weflat/app/admin/components/architects/architects/architects.component';
import { ArchitectComponent } from '@weflat/app/admin/components/common/architect/architect.component';
import { CustomerComponent } from '@weflat/app/admin/components/common/customer/customer.component';
import { VisitComponent } from '@weflat/app/admin/components/common/visit/visit.component';
import { CustomersComponent } from '@weflat/app/admin/components/customers/customers.component';
import { VisitListItemComponent } from '@weflat/app/admin/components/visits/visit/visit-list-item.component';
import { VisitsListComponent } from '@weflat/app/admin/components/visits/visits-list/visits-list.component';
import { VisitsComponent } from '@weflat/app/admin/components/visits/visits/visits.component';
import { ZipCodeComponent } from '@weflat/app/admin/components/zip-codes/zip-code/zip-code.component';
import { ZipCodesComponent } from '@weflat/app/admin/components/zip-codes/zip-codes/zip-codes.component';
import { SharedModule } from '@weflat/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

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
