import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArchitecteProfileComponent } from './components/architecte-profile/architecte-profile.component';
import { VisitsComponent } from './components/visits/visits.component';
import { ReportEditComponent } from './components/report-edit/report-edit.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
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
  MatAutocompleteModule
} from '@angular/material';
import { VisitComponent } from './components/visits/visit/visit.component';
import { ArchitectRoutingModule } from './architect-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ArchitectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    MessagesComponent
  ]
})
export class ArchitectModule { }
