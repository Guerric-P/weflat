import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterArchitecteComponent } from './components/register-architecte/register-architecte.component';
import { RegisterAcheteurComponent } from './components/register-acheteur/register-acheteur.component';
import { CreateVisitGuard } from './guards/create-visit.guard';
import { CreateVisitComponent } from './components/create-visit/create-visit.component';
import { ArchitecteLayoutComponent } from './layout/architecte-layout/architecte-layout.component';
import { ArchitecteGuard } from './guards/architecte.guard';
import { AcheteurLayoutComponent } from './layout/acheteur-layout/acheteur-layout.component';
import { AcheteurGuard } from './guards/acheteur.guard';
import { EndUserLicenseAgreementComponent } from './components/end-user-license-agreement/end-user-license-agreement.component';
import { FrequentlyAskedQuestionsComponent } from './components/frequently-asked-questions/frequently-asked-questions.component';
import { ArchitectOnBoardingComponent } from './components/architect-on-boarding/architect-on-boarding.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { Constantes } from '../shared/common/Constantes'

const routes: Routes = [
  {
    path: '', component: PublicLayoutComponent, children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          description: `Faire appel à weflat, c'est connaitre la qualité et le potentiel d'un bien immobilier avant d'acheter. Simple, rapide et accessible.`
        }
      },
      {
        path: 'register/architecte',
        component: RegisterArchitecteComponent,
        data: {
          title: 'Inscription architecte',
          description: `S'inscrire sur la plateforme en tant qu'architecte`
        }
      },
      {
        path: 'register/acheteur',
        component: RegisterAcheteurComponent,
        data: {
          title: 'Inscription acheteur',
          description: `S'inscrire sur la plateforme en tant qu'acheteur`
        }
      },
      {
        path: 'create-visit',
        canActivate: [CreateVisitGuard],
        component: CreateVisitComponent,
        data: {
          title: 'Création de visite',
          description: `Formulaire de création de visite et de paiement`
        }
      },
      {
        path: 'eula',
        component: EndUserLicenseAgreementComponent,
        data: {
          title: `Conditions d'utilisation`,
          description: `Contrat de licence utilisateur final`
        }
      },
      {
        path: 'faq',
        component: FrequentlyAskedQuestionsComponent,
        data: {
          title: 'Foire aux questions',
          description: 'Questions fréquemment posées'
        }
      },
      {
        path: 'architect-onboarding',
        component: ArchitectOnBoardingComponent,
        data: {
          title: 'Je suis architecte',
          description: 'Rejoignez notre communauté pour compléter vos revenus et développer votre réseau'
        }
      },
      {
        path: 'forgotten-password',
        component: ForgottenPasswordComponent,
        data: {
          title: 'Mot de passe oublié',
          description: 'Page de réinitialisation de mot de passe'
        }
      }
    ]
  }, {
    path: 'architecte',
    component: ArchitecteLayoutComponent,
    canActivate: [ArchitecteGuard],
    data: { authRequired: true },
    loadChildren: '../architect/architect.module#ArchitectModule'
  }, {
    path: 'acheteur',
    component: AcheteurLayoutComponent,
    canActivate: [AcheteurGuard],
    data: { authRequired: true },
    loadChildren: '../customer/customer.module#CustomerModule'
  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    data: { authRequired: true },
    loadChildren: '../admin/admin.module#AdminModule'
  }, {
    path: Constantes.NOT_FOUND_URL,
    loadChildren: '../server-errors/server-errors.module#ServerErrorsModule'
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
