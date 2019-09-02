import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatTooltipModule } from '@angular/material';
import { VisitComponent } from '@weflat/admin/components/common/visit/visit.component';
import { VisitsComponent } from '@weflat/admin/components/visits/visits/visits.component';
import { ArchitectRoutingModule } from '@weflat/architect/architect-routing.module';
import { ArchitecteProfileComponent } from '@weflat/architect/components/architecte-profile/architecte-profile.component';
import { DashboardComponent } from '@weflat/architect/components/dashboard/dashboard.component';
import { HelpHowToVisitModalComponent } from '@weflat/architect/components/help-how-to-visit-modal/help-how-to-visit-modal.component';
import { HelpReportEditionModalComponent } from '@weflat/architect/components/help-report-edition-modal/help-report-edition-modal.component';
import { MessagesComponent } from '@weflat/architect/components/messages/messages.component';
import { ReportEditComponent } from '@weflat/architect/components/report-edit/report-edit.component';
import { SharedModule } from '@weflat/shared/shared.module';

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
  ],
  entryComponents: [
    HelpReportEditionModalComponent,
    HelpHowToVisitModalComponent
  ]
})
export class ArchitectModule { }
