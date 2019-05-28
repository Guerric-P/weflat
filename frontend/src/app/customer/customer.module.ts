import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcheteurProfileComponent } from './components/acheteur-profile/acheteur-profile.component';
import { PurchaseProjectComponent } from './components/purchase-project/purchase-project.component';
import { MyVisitsComponent } from './components/my-visits/my-visits.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatStepperModule,
  MatCardModule,
  MatDialogModule,
  MatDatepickerModule,
  MatSelectModule
} from '@angular/material';
import { MyVisitComponent } from './components/my-visits/my-visit/my-visit.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { EditVisitPopupComponent } from './components/edit-visit-popup/edit-visit-popup.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
