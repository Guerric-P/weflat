import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchitectOnBoardingComponent } from '@weflat/core/components/architect-on-boarding/architect-on-boarding.component';
import { CreateVisitComponent } from '@weflat/core/components/create-visit/create-visit.component';
import { EndUserLicenseAgreementComponent } from '@weflat/core/components/end-user-license-agreement/end-user-license-agreement.component';
import { ForgottenPasswordComponent } from '@weflat/core/components/forgotten-password/forgotten-password.component';
import { FrequentlyAskedQuestionsComponent } from '@weflat/core/components/frequently-asked-questions/frequently-asked-questions.component';
import { HomeComponent } from '@weflat/core/components/home/home.component';
import { RegisterAcheteurComponent } from '@weflat/core/components/register-acheteur/register-acheteur.component';
import { RegisterArchitecteComponent } from '@weflat/core/components/register-architecte/register-architecte.component';
import { AcheteurGuard } from '@weflat/core/guards/acheteur.guard';
import { AdminGuard } from '@weflat/core/guards/admin.guard';
import { ArchitecteGuard } from '@weflat/core/guards/architecte.guard';
import { CreateVisitGuard } from '@weflat/core/guards/create-visit.guard';
import { AcheteurLayoutComponent } from '@weflat/core/layout/acheteur-layout/acheteur-layout.component';
import { AdminLayoutComponent } from '@weflat/core/layout/admin-layout/admin-layout.component';
import { ArchitecteLayoutComponent } from '@weflat/core/layout/architecte-layout/architecte-layout.component';
import { PublicLayoutComponent } from '@weflat/core/layout/public-layout/public-layout.component';

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
    loadChildren: () => import('../architect/architect.module').then(m => m.ArchitectModule)
  }, {
    path: 'acheteur',
    component: AcheteurLayoutComponent,
    canActivate: [AcheteurGuard],
    data: { authRequired: true },
    loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)
  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    data: { authRequired: true },
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  }, {
    path: 'not-found',
    loadChildren: () => import('../server-errors/server-errors.module').then(m => m.ServerErrorsModule)
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
