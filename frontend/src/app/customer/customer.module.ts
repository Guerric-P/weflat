import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcheteurProfileComponent } from './components/acheteur-profile/acheteur-profile.component';
import { AcheteurResolver } from '../shared/resolvers/acheteur.resolver';
import { PurchaseProjectComponent } from './components/purchase-project/purchase-project.component';
import { MyVisitsComponent } from './components/my-visits/my-visits.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatProgressSpinnerModule, MatIconModule, MatStepperModule, MatCardModule, MatDialogModule, MatDatepickerModule } from '@angular/material';
import { MyVisitComponent } from './components/my-visits/my-visit/my-visit.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';

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
    SharedModule
  ],
  declarations: [
    AcheteurProfileComponent,
    PurchaseProjectComponent,
    MyVisitsComponent,
    MyVisitComponent
  ]
})
export class CustomerModule { }
