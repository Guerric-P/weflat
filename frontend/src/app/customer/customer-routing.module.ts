import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AcheteurProfileComponent } from './components/acheteur-profile/acheteur-profile.component';
import { AcheteurResolver } from '../shared/resolvers/acheteur.resolver';
import { PurchaseProjectComponent } from './components/purchase-project/purchase-project.component';
import { MyVisitsComponent } from './components/my-visits/my-visits.component';

const routes: Routes  = [
  { path: '', redirectTo: 'my-visits', pathMatch: 'full' },
  { path: 'profile', component: AcheteurProfileComponent, resolve: { acheteur: AcheteurResolver }, data: { authRequired: true } },
  { path: 'project', component: PurchaseProjectComponent, resolve: { acheteur: AcheteurResolver }, data: { authRequired: true } },
  { path: 'my-visits', component: MyVisitsComponent, data: { authRequired: true } }
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
