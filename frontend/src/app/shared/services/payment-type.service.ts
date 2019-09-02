import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentTypeClass } from '@weflat/core/models/PaymentTypeClass';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentTypeService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<PaymentTypeClass[]> {
        return this.http.get<PaymentTypeClass[]>('/architects/payment-types');
      }
}
