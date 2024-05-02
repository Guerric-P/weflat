import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcheteurProfileComponent } from '@weflat/app/customer/components/acheteur-profile/acheteur-profile.component';
import { EditVisitPopupComponent } from '@weflat/app/customer/components/edit-visit-popup/edit-visit-popup.component';
import { MyVisitComponent } from '@weflat/app/customer/components/my-visits/my-visit/my-visit.component';
import { MyVisitsComponent } from '@weflat/app/customer/components/my-visits/my-visits.component';
import { PurchaseProjectComponent } from '@weflat/app/customer/components/purchase-project/purchase-project.component';
import { CustomerRoutingModule } from '@weflat/app/customer/customer-routing.module';
import { SharedModule } from '@weflat/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

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
    ]
})
export class CustomerModule { }
