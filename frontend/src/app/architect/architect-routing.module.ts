import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchitecteProfileComponent } from '@weflat/app/architect/components/architecte-profile/architecte-profile.component';
import { DashboardComponent } from '@weflat/app/architect/components/dashboard/dashboard.component';
import { MessagesComponent } from '@weflat/app/architect/components/messages/messages.component';
import { ReportEditComponent } from '@weflat/app/architect/components/report-edit/report-edit.component';
import { VisitsComponent } from '@weflat/app/architect/components/visits/visits.component';
import { ReportConsultationComponent } from '@weflat/app/shared/components/report/report-consultation/report-consultation.component';
import { ArchitectSituationResolver } from '@weflat/app/shared/resolvers/architect-situation.resolver';
import { ArchitectTypeResolver } from '@weflat/app/shared/resolvers/architect-type.resolver';
import { ArchitecteResolver } from '@weflat/app/shared/resolvers/architecte.resolver';
import { PaymentTypeResolver } from '@weflat/app/shared/resolvers/payment-type.resolver';
import { PositionResolver } from '@weflat/app/shared/resolvers/position.resolver';
import { ReportResolver } from '@weflat/app/shared/resolvers/report.resolver';
import { ZipCodesResolver } from '@weflat/app/shared/resolvers/zip-codes-resolver';

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
