import { Directive, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
import { environment } from 'environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { VisitService } from '../../shared/services/visit.service';
import { LoaderService } from '../../core/services/loader.service';

@Directive({
  selector: 'button[appPayment]'
})
export class PaymentDirective {

  @Input() visitId: number;
  @Input() email: string;
  @Output() paymentDone: EventEmitter<any> = new EventEmitter<any>();

  constructor(private visiteService: VisitService,
    private notificationsService: NotificationsService,
    private loaderService: LoaderService) { }

  @HostListener('click') openStripePopup() {
    const handler = (<any>window).StripeCheckout.configure({
      key: environment.stripePublicKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      currency: 'eur',
      email: this.email,
      token: function (token: any) {
        this.loaderService.show('Paiement en cours...');
        this.visiteService.pay(this.visitId, token.id).subscribe(res => {
          this.notificationsService.success('Paiement effectué', 'Le paiement a réussi pour votre création de visite.');
          this.loaderService.hide();
          this.paymentDone.emit();
        });
      }.bind(this)
    });

    handler.open({
      name: 'Weflat',
      description: 'Règlement de la prestation',
      amount: 15000
    });
  }
}
