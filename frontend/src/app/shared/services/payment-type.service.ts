import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaymentTypeClass } from "../../core/models/PaymentTypeClass";

@Injectable()
export class PaymentTypeService {

    constructor(private http: HttpClient) { }
    
    getAll(): Observable<PaymentTypeClass[]> {
        return this.http.get<PaymentTypeClass[]>('/architects/payment-types');
      }
}