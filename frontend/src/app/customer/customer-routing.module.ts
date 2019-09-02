import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcheteurProfileComponent } from '@weflat/customer/components/acheteur-profile/acheteur-profile.component';
import { MyVisitsComponent } from '@weflat/customer/components/my-visits/my-visits.component';
import { PurchaseProjectComponent } from '@weflat/customer/components/purchase-project/purchase-project.component';
import { ReportConsultationComponent } from '@weflat/shared/components/report/report-consultation/report-consultation.component';
import { AcheteurResolver } from '@weflat/shared/resolvers/acheteur.resolver';
import { ReportResolver } from '@weflat/shared/resolvers/report.resolver';

const routes: Routes  = [
  { path: '', redirectTo: 'my-visits', pathMatch: 'full' },
  { path: 'profile', component: AcheteurProfileComponent, resolve: { acheteur: AcheteurResolver }, data: { authRequired: true } },
  { path: 'project', component: PurchaseProjectComponent, resolve: { acheteur: AcheteurResolver }, data: { authRequired: true } },
  { path: 'my-visits', component: MyVisitsComponent, data: { authRequired: true } },
  { path: 'visits/:id/report', component: ReportConsultationComponent, resolve: { report: ReportResolver }, data: { authRequired: true } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomerRoutingModule { }
