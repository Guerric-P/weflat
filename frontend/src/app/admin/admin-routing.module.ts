import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { VisitsComponent } from './components/visits/visits/visits.component';
import { ArchitectsComponent } from './components/architects/architects/architects.component';
import { ZipCodesComponent } from './components/zip-codes/zip-codes/zip-codes.component';
import { ReportResolver } from '../shared/resolvers/report.resolver';
import { ReportConsultationComponent } from '../shared/components/report/report-consultation/report-consultation.component';

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
