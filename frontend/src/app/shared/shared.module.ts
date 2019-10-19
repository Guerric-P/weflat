import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShowSigninPopupService } from '@weflat/core/services/show-signin-popup.service';
import { LoaderComponent } from '@weflat/shared/components/loader/loader.component';
import { ReportConsultationComponent } from '@weflat/shared/components/report/report-consultation/report-consultation.component';
import { PaymentDirective } from '@weflat/shared/directives/payment.directive';
import { KeysPipe } from '@weflat/shared/pipes/keys.pipe';
import { AcheteurResolver } from '@weflat/shared/resolvers/acheteur.resolver';
import { ArchitectSituationResolver } from '@weflat/shared/resolvers/architect-situation.resolver';
import { ArchitectTypeResolver } from '@weflat/shared/resolvers/architect-type.resolver';
import { ArchitecteResolver } from '@weflat/shared/resolvers/architecte.resolver';
import { PaymentTypeResolver } from '@weflat/shared/resolvers/payment-type.resolver';
import { PositionResolver } from '@weflat/shared/resolvers/position.resolver';
import { ReportResolver } from '@weflat/shared/resolvers/report.resolver';
import { ZipCodesResolver } from '@weflat/shared/resolvers/zip-codes-resolver';
import { AcheteurService } from '@weflat/shared/services/acheteur.service';
import { ArchitectSituationService } from '@weflat/shared/services/architect-situation.service';
import { ArchitectTypeService } from '@weflat/shared/services/architect-type.service';
import { ArchitectService } from '@weflat/shared/services/architecte.service';
import { LoaderService } from '@weflat/shared/services/loader.service';
import { PaymentTypeService } from '@weflat/shared/services/payment-type.service';
import { PositionService } from '@weflat/shared/services/position.service';
import { ReportService } from '@weflat/shared/services/report.service';
import { UserService } from '@weflat/shared/services/user.service';
import { VisitService } from '@weflat/shared/services/visit.service';
import { ZipCodeService } from '@weflat/shared/services/zip-code.service';

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
