import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterArchitecteComponent } from './components/register-architecte/register-architecte.component';
import { RegisterAcheteurComponent } from './components/register-acheteur/register-acheteur.component';
import { CreateVisitGuard } from './guards/create-visit.guard';
import { CreateVisitComponent } from './components/create-visit/create-visit.component';
import { AuthGuard } from './guards/auth.guard';
import { ArchitecteGuard } from './guards/architecte.guard';
import { AcheteurGuard } from './guards/acheteur.guard';
import { ErrorComponent } from './components/error/error.component';
import { AuthenticationService } from './services/authentication.service';
import { ErrorInterceptor } from './services/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from './services/loader.service';
import { SessionStorageService } from './services/session-storage.service';
import { ShowSigninPopupService } from './services/show-signin-popup.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddressFieldComponent } from './components/home/address-field/address-field.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatTooltipModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatDividerModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatMenuModule,
  MatExpansionModule,
  MatIconModule,
  MatTabsModule,
  MatSelectModule,
  MatCardModule
} from '@angular/material';

import { DisabledZipCodePopupComponent } from './components/disabled-zip-code-popup/disabled-zip-code-popup.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderComponent } from './components/common/loader/loader.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { ArchitecteLayoutComponent } from './layout/architecte-layout/architecte-layout.component';
import { AcheteurLayoutComponent } from './layout/acheteur-layout/acheteur-layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { BaseBackendLayoutComponent } from './layout/base-backend-layout/base-backend-layout.component';
import { VisiteCounterService } from './services/visite-counter.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { EndUserLicenseAgreementComponent } from './components/end-user-license-agreement/end-user-license-agreement.component';
import { FrequentlyAskedQuestionsComponent } from './components/frequently-asked-questions/frequently-asked-questions.component';
import { ArchitectOnBoardingComponent } from './components/architect-on-boarding/architect-on-boarding.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminGuard } from './guards/admin.guard';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SEOService } from './services/seo.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatDividerModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    MatSelectModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    OverlayModule,
    SharedModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    ArchitecteGuard,
    AcheteurGuard,
    AdminGuard,
    CreateVisitGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    SessionStorageService,
    ShowSigninPopupService,
    LoaderService,
    VisiteCounterService,
    SEOService
  ],
  declarations: [
    PublicLayoutComponent,
    HomeComponent,
    RegisterArchitecteComponent,
    RegisterAcheteurComponent,
    CreateVisitComponent,
    BaseBackendLayoutComponent,
    ArchitecteLayoutComponent,
    AcheteurLayoutComponent,
    ErrorComponent,
    NavigationComponent,
    AddressFieldComponent,
    DisabledZipCodePopupComponent,
    LoaderComponent,
    EndUserLicenseAgreementComponent,
    FrequentlyAskedQuestionsComponent,
    ArchitectOnBoardingComponent,
    AdminLayoutComponent,
    ForgottenPasswordComponent
  ],
  exports: [
    LoaderComponent,
    RouterModule
  ]
})
export class CoreModule {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SEOService
    ) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    )
      .subscribe((event) => {
        this.seoService.updateTitle(event['title']);
        //Updating Description tag dynamically with title
        this.seoService.updateDescription(event['description']);
      });
  }
}
