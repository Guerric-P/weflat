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
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
  ],
  entryComponents: [
    HelpReportEditionModalComponent,
    HelpHowToVisitModalComponent
  ]
})
export class ArchitectModule { }
