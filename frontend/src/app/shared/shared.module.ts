import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ShowSigninPopupService } from '@weflat/app/core/services/show-signin-popup.service';
import { LoaderComponent } from '@weflat/app/shared/components/loader/loader.component';
import { ReportConsultationComponent } from '@weflat/app/shared/components/report/report-consultation/report-consultation.component';
import { PaymentDirective } from '@weflat/app/shared/directives/payment.directive';
import { KeysPipe } from '@weflat/app/shared/pipes/keys.pipe';
import { AcheteurResolver } from '@weflat/app/shared/resolvers/acheteur.resolver';
import { ArchitectSituationResolver } from '@weflat/app/shared/resolvers/architect-situation.resolver';
import { ArchitectTypeResolver } from '@weflat/app/shared/resolvers/architect-type.resolver';
import { ArchitecteResolver } from '@weflat/app/shared/resolvers/architecte.resolver';
import { PaymentTypeResolver } from '@weflat/app/shared/resolvers/payment-type.resolver';
import { PositionResolver } from '@weflat/app/shared/resolvers/position.resolver';
import { ReportResolver } from '@weflat/app/shared/resolvers/report.resolver';
import { ZipCodesResolver } from '@weflat/app/shared/resolvers/zip-codes-resolver';
import { AcheteurService } from '@weflat/app/shared/services/acheteur.service';
import { ArchitectSituationService } from '@weflat/app/shared/services/architect-situation.service';
import { ArchitectTypeService } from '@weflat/app/shared/services/architect-type.service';
import { ArchitectService } from '@weflat/app/shared/services/architecte.service';
import { LoaderService } from '@weflat/app/shared/services/loader.service';
import { PaymentTypeService } from '@weflat/app/shared/services/payment-type.service';
import { PositionService } from '@weflat/app/shared/services/position.service';
import { ReportService } from '@weflat/app/shared/services/report.service';
import { UserService } from '@weflat/app/shared/services/user.service';
import { VisitService } from '@weflat/app/shared/services/visit.service';
import { ZipCodeService } from '@weflat/app/shared/services/zip-code.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    PaymentDirective,
    ReportConsultationComponent,
    KeysPipe,
    LoaderComponent
  ],
  exports: [
    PaymentDirective,
    ReportConsultationComponent,
    KeysPipe
  ],
  entryComponents: [
    LoaderComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AcheteurService,
        ArchitectService,
        ZipCodesResolver,
        ReportResolver,
        VisitService,
        ArchitectSituationService,
        ArchitectTypeService,
        ReportService,
        ArchitecteResolver,
        ArchitectSituationResolver,
        ArchitectTypeResolver,
        PaymentTypeResolver,
        UserService,
        PositionResolver,
        PositionService,
        ShowSigninPopupService,
        AcheteurResolver,
        LoaderService,
        ZipCodeService,
        PaymentTypeService
      ]
    };
  }
}
