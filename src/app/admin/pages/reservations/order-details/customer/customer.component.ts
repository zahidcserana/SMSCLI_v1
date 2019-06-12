import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../../models/order-models';
import { Subscription } from 'rxjs';
import { OrderService } from '../../order.service/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-details-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['../order-details.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {

  customer: Customer;
  sub: Subscription;
  order_id: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private orderS: OrderService
  ) {
    this.order_id = this.activeRoute.parent.snapshot.params.order_id;
    // console.log(this.order_id);
   }

  ngOnInit() {
    this.getCustomer();
    this.updateCustomer();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCustomer() {
    this.orderS.getOrderCustomer(this.order_id).subscribe(
      res => {
        this.customer = res.data;
        // console.log(this.customer);
      },
      err => console.log(err)
    );
  }

  updateCustomer() {
    this.sub = this.orderS.updateData.subscribe(
      val => {
        if (val.update && val.from == 'CUSTOMER') {
          // console.log(val);
          this.customer = val.data;
        }
      }
    );
  }

}
