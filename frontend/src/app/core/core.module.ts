import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule } from '@angular/router';
import { ArchitectOnBoardingComponent } from '@weflat/app/core/components/architect-on-boarding/architect-on-boarding.component';
import { SigninModalComponent } from '@weflat/app/core/components/common/signin-modal/signin-modal.component';
import { SignupModalComponent } from '@weflat/app/core/components/common/signup-modal/signup-modal.component';
import { CreateVisitComponent } from '@weflat/app/core/components/create-visit/create-visit.component';
import { DisabledZipCodePopupComponent } from '@weflat/app/core/components/disabled-zip-code-popup/disabled-zip-code-popup.component';
import { EndUserLicenseAgreementComponent } from '@weflat/app/core/components/end-user-license-agreement/end-user-license-agreement.component';
import { ErrorComponent } from '@weflat/app/core/components/error/error.component';
import { ForgottenPasswordComponent } from '@weflat/app/core/components/forgotten-password/forgotten-password.component';
import { FrequentlyAskedQuestionsComponent } from '@weflat/app/core/components/frequently-asked-questions/frequently-asked-questions.component';
import { AddressFieldComponent } from '@weflat/app/core/components/home/address-field/address-field.component';
import { HomeComponent } from '@weflat/app/core/components/home/home.component';
import { NavigationComponent } from '@weflat/app/core/components/navigation/navigation.component';
import { RegisterAcheteurComponent } from '@weflat/app/core/components/register-acheteur/register-acheteur.component';
import { RegisterArchitecteComponent } from '@weflat/app/core/components/register-architecte/register-architecte.component';
import { CoreRoutingModule } from '@weflat/app/core/core-routing.module';
import { AcheteurGuard } from '@weflat/app/core/guards/acheteur.guard';
import { AdminGuard } from '@weflat/app/core/guards/admin.guard';
import { ArchitecteGuard } from '@weflat/app/core/guards/architecte.guard';
import { CreateVisitGuard } from '@weflat/app/core/guards/create-visit.guard';
import { AcheteurLayoutComponent } from '@weflat/app/core/layout/acheteur-layout/acheteur-layout.component';
import { AdminLayoutComponent } from '@weflat/app/core/layout/admin-layout/admin-layout.component';
import { ArchitecteLayoutComponent } from '@weflat/app/core/layout/architecte-layout/architecte-layout.component';
import { BaseBackendLayoutComponent } from '@weflat/app/core/layout/base-backend-layout/base-backend-layout.component';
import { PublicLayoutComponent } from '@weflat/app/core/layout/public-layout/public-layout.component';
import { AuthenticationService } from '@weflat/app/core/services/authentication.service';
import { SEOService } from '@weflat/app/core/services/seo.service';
import { SessionStorageService } from '@weflat/app/core/services/session-storage.service';
import { ShowSigninPopupService } from '@weflat/app/core/services/show-signin-popup.service';
import { UpdateService } from '@weflat/app/core/services/update.service';
import { VisiteCounterService } from '@weflat/app/core/services/visite-counter.service';
import { LoaderService } from '@weflat/app/shared/services/loader.service';
import { SharedModule } from '@weflat/app/shared/shared.module';
import { debounceTime, filter, map, mergeMap } from 'rxjs/operators';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';

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
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatMenuModule,
        MatExpansionModule,
        MatSelectModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTabsModule,
        OverlayModule,
        SharedModule.forRoot()
    ],
    providers: [
        AuthenticationService,
        ArchitecteGuard,
        AcheteurGuard,
        AdminGuard,
        CreateVisitGuard,
        SessionStorageService,
        ShowSigninPopupService,
        VisiteCounterService,
        SEOService,
        UpdateService
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
        EndUserLicenseAgreementComponent,
        FrequentlyAskedQuestionsComponent,
        ArchitectOnBoardingComponent,
        AdminLayoutComponent,
        ForgottenPasswordComponent,
        SigninModalComponent,
        SignupModalComponent
    ],
    exports: [
        RouterModule
    ]
})
export class CoreModule {

  counter = 0;

  constructor(
    router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SEOService,
    @Optional() @SkipSelf() parentModule: CoreModule,
    loaderService: LoaderService,
    updateServiceDoNotRemove: UpdateService
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }

    router.events.pipe(
      filter(x => x instanceof NavigationStart),
      debounceTime(200),
    ).subscribe(() => {
      /*
      If this condition is true, then the event corresponding to the end of this NavigationStart
      has not passed yet so we show the loader
      */
      if (this.counter === 0) {
        loaderService.show();
      }
      this.counter++;
    });

    router.events.pipe(
      filter(x => x instanceof NavigationEnd || x instanceof NavigationCancel || x instanceof NavigationError)
    ).subscribe(() => {
      this.counter--;
      loaderService.hide();
    });

    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
    )
      .subscribe(event => {
        this.seoService.updateTitle(event['title']);
        // Updating Description tag dynamically with title
        this.seoService.updateDescription(event['description']);
      });
  }
}
