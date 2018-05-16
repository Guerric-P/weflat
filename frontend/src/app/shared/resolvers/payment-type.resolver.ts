import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { PaymentTypeClass } from "../../core/models/PaymentTypeClass";
import { Observable } from "rxjs";
import { PaymentTypeService } from "../services/payment-type.service";

@Injectable()
export class PaymentTypeResolver implements Resolve<PaymentTypeClass[]> {

    constructor(private paymentTypeService: PaymentTypeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PaymentTypeClass[] | Observable<PaymentTypeClass[]> | Promise<PaymentTypeClass[]> {
        return this.paymentTypeService.getAll();
    }
}