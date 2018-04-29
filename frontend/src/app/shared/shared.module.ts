import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcheteurService } from './services/acheteur.service';
import { ArchitecteService } from './services/architecte.service';
import { ZipCodesResolver } from './resolvers/zip-codes-resolver';
import { ReportResolver } from './resolvers/report.resolver';
import { VisiteService } from './services/visite.service';
import { ArchitectSituationService } from './services/architect-situation.service';
import { ArchitectTypeService } from './services/architect-type.service';
import { ReportService } from './services/report.service';
import { ArchitecteResolver } from './resolvers/architecte.resolver';
import { ArchitectSituationResolver } from './resolvers/architect-situation.resolver';
import { ArchitectTypeResolver } from './resolvers/architect-type.resolver';
import { UserService } from './services/user.service';
import { PositionResolver } from './resolvers/position.resolver';
import { PositionService } from './services/position.service';
import { ShowSigninPopupService } from '../core/services/show-signin-popup.service';
import { AcheteurResolver } from './resolvers/acheteur.resolver';
import { LoaderService } from '../core/services/loader.service';
import { PaymentDirective } from './directives/payment.directive';
import { ReportConsultationComponent } from './components/report/report-consultation/report-consultation.component';
import { ZipCodeService } from './services/zip-code.service';
import { MatTooltipModule, MatButtonModule } from '@angular/material';
import { PaymentTypeService } from './services/payment-type.service';
import { PaymentTypeResolver } from './resolvers/payment-type.resolver';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule
  ],
  declarations: [
    PaymentDirective,
    ReportConsultationComponent
  ],
  exports: [
    PaymentDirective,
    ReportConsultationComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AcheteurService,
        ArchitecteService,
        ZipCodesResolver,
        ReportResolver,
        VisiteService,
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
