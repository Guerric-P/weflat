import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { AcheteurProfileComponent } from '@weflat/customer/components/acheteur-profile/acheteur-profile.component';
import { EditVisitPopupComponent } from '@weflat/customer/components/edit-visit-popup/edit-visit-popup.component';
import { MyVisitComponent } from '@weflat/customer/components/my-visits/my-visit/my-visit.component';
import { MyVisitsComponent } from '@weflat/customer/components/my-visits/my-visits.component';
import { PurchaseProjectComponent } from '@weflat/customer/components/purchase-project/purchase-project.component';
import { CustomerRoutingModule } from '@weflat/customer/customer-routing.module';
import { SharedModule } from '@weflat/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    SharedModule
  ],
  declarations: [
    AcheteurProfileComponent,
    PurchaseProjectComponent,
    MyVisitsComponent,
    MyVisitComponent,
    EditVisitPopupComponent
  ],
  entryComponents: [
    EditVisitPopupComponent
  ]
})
export class CustomerModule { }
