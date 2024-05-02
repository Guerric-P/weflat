import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PaymentTypeClass } from '@weflat/app/core/models/PaymentTypeClass';
import { PaymentTypeService } from '@weflat/app/shared/services/payment-type.service';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentTypeResolver  {

    constructor(private paymentTypeService: PaymentTypeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        PaymentTypeClass[] | Observable<PaymentTypeClass[]> | Promise<PaymentTypeClass[]> {
        return this.paymentTypeService.getAll();
    }
}
