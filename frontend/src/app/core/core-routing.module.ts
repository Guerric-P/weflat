import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterArchitecteComponent } from './components/register-architecte/register-architecte.component';
import { RegisterAcheteurComponent } from './components/register-acheteur/register-acheteur.component';
import { CreateVisitGuard } from './guards/create-visit.guard';
import { CreateVisitComponent } from './components/create-visit/create-visit.component';
import { ArchitecteLayoutComponent } from './layout/architecte-layout/architecte-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { ArchitecteGuard } from './guards/architecte.guard';
import { AcheteurLayoutComponent } from './layout/acheteur-layout/acheteur-layout.component';
import { AcheteurGuard } from './guards/acheteur.guard';
import { ErrorComponent } from './components/error/error.component';
import { EndUserLicenseAgreementComponent } from './components/end-user-license-agreement/end-user-license-agreement.component';
import { FrequentlyAskedQuestionsComponent } from './components/frequently-asked-questions/frequently-asked-questions.component';
import { ArchitectOnBoardingComponent } from './components/architect-on-boarding/architect-on-boarding.component';

const routes: Routes = [
  {
    path: '', component: PublicLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'register/architecte', component: RegisterArchitecteComponent },
      { path: 'register/acheteur', component: RegisterAcheteurComponent },
      { path: 'create-visit', canActivate: [CreateVisitGuard], component: CreateVisitComponent },
      { path: 'eula', component: EndUserLicenseAgreementComponent },
      { path: 'faq', component: FrequentlyAskedQuestionsComponent },
      { path: 'architect-onboarding', component: ArchitectOnBoardingComponent }
    ]
  }, {
    path: 'architecte',
    component: ArchitecteLayoutComponent,
    canActivate: [AuthGuard, ArchitecteGuard],
    data: { authRequired: true },
    loadChildren: '../architect/architect.module#ArchitectModule'
  }, {
    path: 'acheteur',
    component: AcheteurLayoutComponent,
    canActivate: [AuthGuard, AcheteurGuard],
    data: { authRequired: true },
    loadChildren: '../customer/customer.module#CustomerModule'
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
