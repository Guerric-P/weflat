import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterArchitecteComponent } from './components/register-architecte/register-architecte.component';
import { RegisterAcheteurComponent } from './components/register-acheteur/register-acheteur.component';
import { CreateVisitGuard } from './guards/create-visit.guard';
import { CreateVisitComponent } from './components/create-visit/create-visit.component';
import { AuthGuard } from './guards/auth.guard';
import { ArchitecteGuard } from './guards/architecte.guard';
import { AcheteurGuard } from './guards/acheteur.guard';
import { ErrorComponent } from './components/error/error.component';
import { ArchitectModule } from '../architect/architect.module';
import { CustomerModule } from '../customer/customer.module';
import { AuthenticationService } from './services/authentication.service';
import { ErrorInterceptor } from './services/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from './services/loader.service';
import { LocalStorageService } from './services/local-storage.service';
import { SessionStorageService } from './services/session-storage.service';
import { ShowSigninPopupService } from './services/show-signin-popup.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddressFieldComponent } from './components/home/address-field/address-field.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatDividerModule, MatStepperModule, MatProgressSpinnerModule, MatInputModule, MatButtonModule } from '@angular/material';
import { DisabledZipCodePopupComponent } from './components/disabled-zip-code-popup/disabled-zip-code-popup.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './components/common/loader/loader.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { ArchitecteLayoutComponent } from './layout/architecte-layout/architecte-layout.component';
import { AcheteurLayoutComponent } from './layout/acheteur-layout/acheteur-layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { BaseBackendLayoutComponent } from './layout/base-backend-layout/base-backend-layout.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    NgbModule,
    SharedModule.forRoot(),
    ArchitectModule,
    CustomerModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    ArchitecteGuard,
    AcheteurGuard,
    CreateVisitGuard,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    SessionStorageService,
    ShowSigninPopupService,
    LoaderService
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
    LoaderComponent
  ],
  exports: [
    LoaderComponent,
    RouterModule
  ]
})
export class CoreModule { }
