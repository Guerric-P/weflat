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
import { DispoComponent } from './components/dispo/dispo.component';
import { ZipCodesResolver } from '../shared/resolvers/zip-codes-resolver';
import { MessagesComponent } from './components/messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatChipsModule, MatIconModule, MatExpansionModule } from '@angular/material';
import { VisitComponent } from './components/visits/visit/visit.component';
import { ArchitectRoutingModule } from './architect-routing.module';
import { VisiteCounterService } from './services/visite-counter.service';

@NgModule({
  imports: [
    CommonModule,
    ArchitectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule
  ],
  declarations: [
    DashboardComponent,
    ArchitecteProfileComponent,
    VisitsComponent,
    VisitComponent,
    ReportEditComponent,
    DispoComponent,
    MessagesComponent
  ],
  providers: [
    VisiteCounterService
  ],
  exports: [
    RouterModule
  ]
})
export class ArchitectModule { }
