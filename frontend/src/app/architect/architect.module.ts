import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchitectRoutingModule } from '@weflat/app/architect/architect-routing.module';
import { ArchitecteProfileComponent } from '@weflat/app/architect/components/architecte-profile/architecte-profile.component';
import { DashboardComponent } from '@weflat/app/architect/components/dashboard/dashboard.component';
import { HelpHowToVisitModalComponent } from '@weflat/app/architect/components/help-how-to-visit-modal/help-how-to-visit-modal.component';
import { HelpReportEditionModalComponent } from '@weflat/app/architect/components/help-report-edition-modal/help-report-edition-modal.component';
import { MessagesComponent } from '@weflat/app/architect/components/messages/messages.component';
import { ReportEditComponent } from '@weflat/app/architect/components/report-edit/report-edit.component';
import { VisitComponent } from '@weflat/app/architect/components/visits/visit/visit.component';
import { VisitsComponent } from '@weflat/app/architect/components/visits/visits.component';
import { SharedModule } from '@weflat/app/shared/shared.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
    imports: [
        CommonModule,
        ArchitectRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
        MatExpansionModule,
        MatTooltipModule,
        MatDialogModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        SharedModule
    ],
    declarations: [
        DashboardComponent,
        ArchitecteProfileComponent,
        VisitsComponent,
        VisitComponent,
        ReportEditComponent,
        MessagesComponent,
        HelpReportEditionModalComponent,
        HelpHowToVisitModalComponent
    ]
})
export class ArchitectModule { }
