import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitsComponent } from '@weflat/admin/components/visits/visits/visits.component';
import { ArchitecteProfileComponent } from '@weflat/architect/components/architecte-profile/architecte-profile.component';
import { DashboardComponent } from '@weflat/architect/components/dashboard/dashboard.component';
import { MessagesComponent } from '@weflat/architect/components/messages/messages.component';
import { ReportEditComponent } from '@weflat/architect/components/report-edit/report-edit.component';
import { ReportConsultationComponent } from '@weflat/shared/components/report/report-consultation/report-consultation.component';
import { ArchitectSituationResolver } from '@weflat/shared/resolvers/architect-situation.resolver';
import { ArchitectTypeResolver } from '@weflat/shared/resolvers/architect-type.resolver';
import { ArchitecteResolver } from '@weflat/shared/resolvers/architecte.resolver';
import { PaymentTypeResolver } from '@weflat/shared/resolvers/payment-type.resolver';
import { PositionResolver } from '@weflat/shared/resolvers/position.resolver';
import { ReportResolver } from '@weflat/shared/resolvers/report.resolver';
import { ZipCodesResolver } from '@weflat/shared/resolvers/zip-codes-resolver';

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
