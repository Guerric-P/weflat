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
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

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
