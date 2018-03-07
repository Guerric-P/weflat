import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import { VisiteService } from 'app/services/visite.service';
import { NotificationsService } from 'angular2-notifications';
import { LoaderService } from '../services/loader.service';

@Directive({
  selector: 'button[appPayment]',
  host: {
    '(click)': 'openStripePopup()',
    '[disabled]': 'buttonDisabled'
  }
})
export class PaymentDirective {

  buttonDisabled: boolean;
  @Input() visitId: number;
  @Output() paymentDone: EventEmitter<any> = new EventEmitter<any>();

  constructor(private visiteService: VisiteService,
    private notificationsService: NotificationsService,
    private loaderService: LoaderService) { }

  openStripePopup() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripePublicKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      zipCode: true,
      currency: 'eur',
      token: function (token: any) {
        this.loaderService.show("Paiement en cours...");
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
