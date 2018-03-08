//Angular

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatTabsModule, MatChipsModule, MatIconModule, MatNativeDateModule, MatDividerModule, MatProgressSpinnerModule, MatExpansionModule} from '@angular/material';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

//Libraries

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';


//Resolvers

import { ZipCodesResolver } from 'app/resolvers/zip-codes-resolver';
import { ArchitecteResolver } from 'app/resolvers/architecte.resolver';
import { ArchitectSituationResolver } from 'app/resolvers/architect-situation.resolver';
import { ArchitectTypeResolver } from 'app/resolvers/architect-type.resolver';
import { AcheteurResolver } from 'app/resolvers/acheteur.resolver';
import { ReportResolver } from 'app/resolvers/report.resolver';
import { PositionResolver } from 'app/resolvers/position.resolver';

//Guards

import { AuthGuard } from 'app/guards/auth.guard';
import { ArchitecteGuard } from 'app/guards/architecte.guard';
import { AcheteurGuard } from 'app/guards/acheteur.guard';
import { CreateVisitGuard } from 'app/guards/create-visit.guard';

//Services

import { AcheteurService } from 'app/services/acheteur.service';
import { ArchitecteService } from 'app/services/architecte.service';
import { LocalStorageService } from 'app/services/local-storage.service';
import { SessionStorageService } from 'app/services/session-storage.service';
import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { VisiteCounterService } from 'app/services/visite-counter.service';
import { ErrorInterceptor } from 'app/common/http-interceptor.service';
import { ArchitectSituationService } from 'app/services/architect-situation.service';
import { ArchitectTypeService } from 'app/services/architect-type.service';
import { ReportService } from 'app/services/report.service';
import { UserService } from 'app/services/user.service';
import { PositionService } from 'app/services/position.service';
import { ShowSigninPopupService } from 'app/services/show-signin-popup.service';
import { LoaderService } from'app/services/loader.service';

//Components

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddressFieldComponent } from './components/home/address-field/address-field.component';
import { ArchitecteProfileComponent } from './components/architecte/architecte-profile/architecte-profile.component';
import { AcheteurProfileComponent } from './components/acheteur/acheteur-profile/acheteur-profile.component';
import { VisiteService } from 'app/services/visite.service';
import { VisitComponent } from './components/architecte/visits/visit/visit.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { ArchitecteLayoutComponent } from './layout/architecte-layout/architecte-layout.component';
import { AcheteurLayoutComponent } from './layout/acheteur-layout/acheteur-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CreateVisitComponent } from './components/create-visit/create-visit.component';
import { RegisterArchitecteComponent } from './components/register-architecte/register-architecte.component';
import { RegisterAcheteurComponent } from './components/register-acheteur/register-acheteur.component';
import { VisitsComponent } from './components/architecte/visits/visits.component';
import { DispoComponent } from './components/architecte/dispo/dispo.component';
import { MessagesComponent } from './components/architecte/messages/messages.component';
import { DashboardComponent } from './components/architecte/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { BaseBackendLayoutComponent } from './layout/base-backend-layout/base-backend-layout.component';
import { PurchaseProjectComponent } from './components/acheteur/purchase-project/purchase-project.component';
import { ReportEditComponent } from './components/report/report-edit/report-edit.component';

//Models

import { VisiteClass } from './models/VisiteClass';
import { ZipCodeClass } from './models/ZipCodeClass';
import { ArchitecteClass } from './models/ArchitecteClass';
import { UserClass } from './models/UserClass';
import { AcheteurClass } from './models/AcheteurClass';
import { ArchitectSituationClass } from './models/ArchitectSituationClass';
import { ArchitectTypeClass } from './models/ArchitectTypeClass';
import { MyVisitsComponent } from './components/acheteur/my-visits/my-visits.component';
import { DisabledZipCodePopupComponent } from './components/disabled-zip-code-popup/disabled-zip-code-popup.component';
import { MyVisitComponent } from './components/acheteur/my-visits/my-visit/my-visit.component';
import { PaymentDirective } from './directives/payment.directive';
import { LoaderComponent } from './components/common/loader/loader.component';
import { ReportConsultationComponent } from './components/report/report-consultation/report-consultation.component';


const appRoutes: Routes = [
  {
    path: '', component: PublicLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'register/architecte', component: RegisterArchitecteComponent },
      { path: 'register/acheteur', component: RegisterAcheteurComponent },
      { path: 'create-visit', canActivate: [CreateVisitGuard], component: CreateVisitComponent }
    ]
  }, {
    path: 'architecte', component: ArchitecteLayoutComponent, canActivate: [AuthGuard, ArchitecteGuard], data: { authRequired: true }, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { authRequired: true } },
      { path: 'profile', component: ArchitecteProfileComponent, resolve:
        {
          architecte: ArchitecteResolver,
          architectTypes: ArchitectTypeResolver,
          architectSituations: ArchitectSituationResolver
        }, data: { authRequired: true } },
      { path: 'visits', component: VisitsComponent, data: { authRequired: true } },
      { path: 'visits/:id/report', component: ReportEditComponent, resolve: { report: ReportResolver, positions: PositionResolver }, data: { authRequired: true } },
      { path: 'dispo', component: DispoComponent, resolve: { zipCodes: ZipCodesResolver }, data: { authRequired: true } },
      { path: 'messages', component: MessagesComponent, data: { authRequired: true } }
    ]
  }, {
    path: 'acheteur', component: AcheteurLayoutComponent, canActivate: [AuthGuard, AcheteurGuard], data: { authRequired: true }, children: [
      { path: '', redirectTo: 'my-visits', pathMatch: 'full' },
      { path: 'visit', component: CreateVisitComponent, data: { authRequired: true } },
      { path: 'profile', component: AcheteurProfileComponent, resolve: { acheteur: AcheteurResolver }, data: { authRequired: true } },
      { path: 'project', component: PurchaseProjectComponent, resolve: { acheteur: AcheteurResolver }, data: { authRequired: true } },
      { path: 'my-visits', component: MyVisitsComponent, data: { authRequired: true } }
    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ErrorComponent,
    HomeComponent,
    CreateVisitComponent,
    RegisterArchitecteComponent,
    RegisterAcheteurComponent,
    PublicLayoutComponent,
    ArchitecteLayoutComponent,
    AcheteurLayoutComponent,
    VisitsComponent,
    DispoComponent,
    MessagesComponent,
    DashboardComponent,
    AddressFieldComponent,
    ArchitecteProfileComponent,
    AcheteurProfileComponent,
    VisitComponent,
    BaseBackendLayoutComponent,
    PurchaseProjectComponent,
    ReportEditComponent,
    MyVisitsComponent,
    CreateVisitComponent,
    DisabledZipCodePopupComponent,
    MyVisitComponent,
    PaymentDirective,
    LoaderComponent,
    ReportConsultationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: false/*, enableTracing: true */}),
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [AlertService,
    AuthenticationService,
    AuthGuard,
    ArchitecteGuard,
    AcheteurGuard,
    CreateVisitGuard,
    AcheteurService,
    ArchitecteService,
    LocalStorageService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    ZipCodesResolver,
    ReportResolver,
    SessionStorageService,
    VisiteService,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    VisiteCounterService,
    ArchitectSituationService,
    ArchitectTypeService,
    ReportService,
    ArchitecteResolver,
    ArchitectSituationResolver,
    ArchitectTypeResolver,
    UserService,
    PositionResolver,
    PositionService,
    ShowSigninPopupService,
    AcheteurResolver,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
