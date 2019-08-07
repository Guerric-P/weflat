import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArchitecteProfileComponent } from './components/architecte-profile/architecte-profile.component';
import { VisitsComponent } from './components/visits/visits.component';
import { ReportEditComponent } from './components/report-edit/report-edit.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VisitComponent } from './components/visits/visit/visit.component';
import { ArchitectRoutingModule } from './architect-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HelpReportEditionModalComponent } from './components/help-report-edition-modal/help-report-edition-modal.component';
import { HelpHowToVisitModalComponent } from './components/help-how-to-visit-modal/help-how-to-visit-modal.component';

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
