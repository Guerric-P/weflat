import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArchitecteProfileComponent } from './components/architecte-profile/architecte-profile.component';
import { ArchitecteResolver } from '../shared/resolvers/architecte.resolver';
import { ArchitectTypeResolver } from '../shared/resolvers/architect-type.resolver';
import { ArchitectSituationResolver } from '../shared/resolvers/architect-situation.resolver';
import { VisitsComponent } from './components/visits/visits.component';
import { ReportEditComponent } from './components/report-edit/report-edit.component';
import { ReportResolver } from '../shared/resolvers/report.resolver';
import { PositionResolver } from '../shared/resolvers/position.resolver';
import { ZipCodesResolver } from '../shared/resolvers/zip-codes-resolver';
import { MessagesComponent } from './components/messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatChipsModule, MatIconModule, MatExpansionModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { VisitComponent } from './components/visits/visit/visit.component';
import { ArchitectRoutingModule } from './architect-routing.module';
import { SharedModule } from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';

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
