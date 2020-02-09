import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchitectsComponent } from '@weflat/app/admin/components/architects/architects/architects.component';
import { CustomersComponent } from '@weflat/app/admin/components/customers/customers.component';
import { VisitsComponent } from '@weflat/app/admin/components/visits/visits/visits.component';
import { ZipCodesComponent } from '@weflat/app/admin/components/zip-codes/zip-codes/zip-codes.component';
import { ReportConsultationComponent } from '@weflat/app/shared/components/report/report-consultation/report-consultation.component';
import { ReportResolver } from '@weflat/app/shared/resolvers/report.resolver';
const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  {
    path: 'customers',
    component: CustomersComponent,
    data: { authRequired: true },
  }, {
    path: 'visits',
    component: VisitsComponent,
    data: { authRequired: true },
  }, {
    path: 'architects',
    component: ArchitectsComponent,
    data: { authRequired: true },
  },
  {
    path: 'zip-codes',
    component: ZipCodesComponent,
    data: { authRequired: true },
  }, {
    path: 'visits/:id/report',
    component: ReportConsultationComponent,
    resolve: { report: ReportResolver },
    data: { authRequired: true }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
