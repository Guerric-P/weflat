import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcheteurProfileComponent } from './components/acheteur-profile/acheteur-profile.component';
import { AcheteurResolver } from '../shared/resolvers/acheteur.resolver';
import { PurchaseProjectComponent } from './components/purchase-project/purchase-project.component';
import { MyVisitsComponent } from './components/my-visits/my-visits.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
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
