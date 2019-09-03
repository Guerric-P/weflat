import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerClass } from '@weflat/core/models/CustomerClass';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @Input() customer: CustomerClass;
  @Output() updated: EventEmitter<CustomerClass> = new EventEmitter<CustomerClass>();

  constructor() { }

  ngOnInit() {
  }
}
