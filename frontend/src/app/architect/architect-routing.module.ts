import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
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
import { ReportConsultationComponent } from '../shared/components/report/report-consultation/report-consultation.component';
import { PaymentTypeResolver } from '../shared/resolvers/payment-type.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { authRequired: true } },
  {
    path: 'profile', component: ArchitecteProfileComponent, resolve:
      {
        architecte: ArchitecteResolver,
        architectTypes: ArchitectTypeResolver,
        architectSituations: ArchitectSituationResolver,
        paymentTypes: PaymentTypeResolver,
        zipCodes: ZipCodesResolver
      }, data: { authRequired: true }
  },
  { path: 'visits', component: VisitsComponent, data: { authRequired: true } },
  {
    path: 'visits/:id/report/edit',
    component: ReportEditComponent,
    resolve: {
      report: ReportResolver,
      positions: PositionResolver
    },
    data: { authRequired: true }
  },
  { path: 'visits/:id/report', component: ReportConsultationComponent, resolve: { report: ReportResolver }, data: { authRequired: true } },
  { path: 'messages', component: MessagesComponent, data: { authRequired: true } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArchitectRoutingModule { }
