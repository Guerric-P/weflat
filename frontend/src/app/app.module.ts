import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AlertService } from 'app/services/alert.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'app/common/http-interceptor.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { AuthGuard } from 'app/guards/auth.guard';
import { ArchitecteGuard } from 'app/guards/architecte.guard';
import { AcheteurGuard } from 'app/guards/acheteur.guard';
import { HomeComponent } from './components/home/home.component';
import { CreerVisiteComponent } from './components/acheteur/creer-visite/creer-visite.component';
import { RegisterArchitecteComponent } from './components/register-architecte/register-architecte.component';
import { RegisterAcheteurComponent } from './components/register-acheteur/register-acheteur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatTabsModule, MatChipsModule, MatIconModule, MatNativeDateModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { RegisterService } from 'app/services/register.service';
import { ArchitecteService } from 'app/services/architecte.service';
import { LocalStorageService } from 'app/services/local-storage.service';
import { SessionStorageService } from 'app/services/session-storage.service';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { ArchitecteLayoutComponent } from './layout/architecte-layout/architecte-layout.component';
import { AcheteurLayoutComponent } from './layout/acheteur-layout/acheteur-layout.component';
import { VisitsComponent } from './components/architecte/visits/visits.component';
import { DispoComponent } from './components/architecte/dispo/dispo.component';
import { MessagesComponent } from './components/architecte/messages/messages.component';
import { DashboardComponent } from './components/architecte/dashboard/dashboard.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ZipCodesResolver } from 'app/resolvers/zip-codes-resolver';
import { AddressFieldComponent } from './components/home/address-field/address-field.component';
import { ArchitecteProfileComponent } from './components/architecte/architecte-profile/architecte-profile.component';
import { AcheteurProfileComponent } from './components/acheteur/acheteur-profile/acheteur-profile.component';
import { VisiteService } from 'app/services/visite.service';
import { VisitComponent } from './components/architecte/visits/visit/visit.component';

import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';

registerLocaleData(localeFr);


const appRoutes: Routes = [
  {
    path: '', component: PublicLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'register/architecte', component: RegisterArchitecteComponent },
      { path: 'register/acheteur', component: RegisterAcheteurComponent }
    ]
  }, {
    path: 'architecte', component: ArchitecteLayoutComponent, canActivate: [AuthGuard, ArchitecteGuard], data: { authRequired: true }, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { authRequired: true } },
      { path: 'profile', component: ArchitecteProfileComponent, data: { authRequired: true } },
      { path: 'visits', component: VisitsComponent, data: { authRequired: true } },
      { path: 'dispo', component: DispoComponent, resolve: { zipCodes: ZipCodesResolver }, data: { authRequired: true } },
      { path: 'messages', component: MessagesComponent, data: { authRequired: true } }
    ]
  }, {
    path: 'acheteur', component: AcheteurLayoutComponent, canActivate: [AuthGuard, AcheteurGuard], data: { authRequired: true }, children: [
      { path: '', redirectTo: 'visiter', pathMatch: 'full' },
      { path: 'visiter', component: CreerVisiteComponent, data: { authRequired: true } },
      { path: 'profile', component: AcheteurProfileComponent, data: { authRequired: true } }
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
    CreerVisiteComponent,
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
    BaseLayoutComponent
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
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [AlertService,
    AuthenticationService,
    AuthGuard,
    ArchitecteGuard,
    AcheteurGuard,
    RegisterService,
    ArchitecteService,
    LocalStorageService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    ZipCodesResolver,
    SessionStorageService,
    VisiteService,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
