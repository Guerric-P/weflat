import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PaymentTypeClass } from '@weflat/core/models/PaymentTypeClass';
import { PaymentTypeService } from '@weflat/shared/services/payment-type.service';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentTypeResolver implements Resolve<PaymentTypeClass[]> {

    constructor(private paymentTypeService: PaymentTypeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        PaymentTypeClass[] | Observable<PaymentTypeClass[]> | Promise<PaymentTypeClass[]> {
        return this.paymentTypeService.getAll();
    }
}
