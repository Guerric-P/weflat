import { Directive, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { LoaderService } from '@weflat/shared/services/loader.service';
import { VisitService } from '@weflat/shared/services/visit.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'environments/environment';

@Directive({
  selector: 'button[appPayment]'
})
export class PaymentDirective implements OnInit {

  @Input() visitId: number;
  @Input() email: string;
  @Output() paymentDone: EventEmitter<any> = new EventEmitter<any>();
  @Input() price: number;
  handler: any;

  constructor(
    private visiteService: VisitService,
    private loaderService: LoaderService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.handler = (<any>window).StripeCheckout.configure({
      key: environment.stripePublicKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      currency: 'eur',
      email: this.email,
      token: (token: any) => {
        this.loaderService.show('Paiement en cours...');
        this.visiteService.pay(this.visitId, token.id).subscribe(res => {
          this.notificationsService.success('Paiement effectué', 'Le paiement a réussi pour votre création de visite.');
          this.loaderService.hide();
          this.paymentDone.emit();
        });
      }
    });
  }

  @HostListener('click') openStripePopup() {
    this.handler.open({
      name: 'Weflat',
      description: 'Règlement de la prestation',
      amount: this.price
    });
  }
}
