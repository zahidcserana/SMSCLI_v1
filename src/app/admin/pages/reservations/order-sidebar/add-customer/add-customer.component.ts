import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { EndPoint } from '../../../../../globals/endPoint/config';
import { Customer } from '../../models/order-models';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../order.service/order.service';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { Subscription } from 'rxjs';

declare let $:any;

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit, OnDestroy {

  customer: Customer;
  url: string = EndPoint + 'users/customers';
  edit: boolean;
  loader_sub: boolean;
  loader: boolean;
  sub: Subscription[] = [];
  path: string;
  order_id: number;
  shiping: boolean;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private alertS: AlertService,
    private orderS: OrderService
  ) {
    this.customer = new Customer();
    this.path = this.activeRoute.snapshot['_routerState'].url;
   }

  ngOnInit() {
    $('.native-routing-container').scrollTop(0, 0);
    this.order_id = this.orderS.getOrderId(this.activeRoute);
    if (this.order_id ) {
      this.edit = true;
      this.dataRender();
    }
  }

  ngOnDestroy() {
    for (let s of this.sub) {
      s.unsubscribe();
    }
  }

  dataRender() {
    this.sub[0] =  this.activeRoute.data.subscribe(
      val => {
        if(val['customer'].data) {
          this.customer = val['customer'].data;
          this.shiping = this.customer.shipping_address1 ? true : false;
        }
        // console.log(this.customer);
      }
    ); 
  }

  getCustomer(e) {
    this.loader_sub = true;
    this.orderS.getCustomer(e)
    .subscribe (
      res => {
        let cus = new Customer();
        this.loader_sub = false;
        this.customer = this.orderS.formateCustomer(res.data, cus);
        // console.log(res.data, this.customer);
      },
      err => {
        this.loader_sub = false;
        this.error(err, 'Something wrong! Please try again')
      } 
    );
  }

  changeValue(e) {
    if(e) {
      this.getCustomer(e)
      console.log(e);
    }
  }

  submitCustomer(form) {
    this.loader = true;
    this.customer['status'] = 1;
    // console.log(this.customer);
    this.orderS.addCustomer(this.customer)
    .then(
      res => {
        this.alertS.success(this.alertContainer, 'New order has been created', true, 5000);
        this.loader = false;
        // console.log(res.result);
        this.orderS.updateOrder({data: this.orderS.formateNewOrder(res.result, this.customer), add: true});
        const path = this.activeRoute.snapshot['_routerState'].url.replace('/add-order/customer', '');
        this.router.navigate([`${path}/edit-order/${res.result.order_id}/product`]);
      }
    ).catch(
      err => {
        this.loader = false;
        this.error(err, 'Something wrong! New order has been not created');
      }
    );
  }

  updateCustomer() {
    this.loader = true;
    // console.log(this.customer);
    this.orderS.updateCustomer(this.order_id, this.customer)
    .then(
      res => {
        this.alertS.success(this.alertContainer, 'Customer has been created', true, 5000);
        this.loader = false;
        // console.log(res);
        if (this.path.includes('details')) {
          this.orderS.update({data: this.customer, from: 'CUSTOMER', update: true});
        } else {
          this.orderS.updateOrder({data: res.result, add: false});
        }
      }
    ).catch(
      err => {
        this.loader = false;
        this.error(err, 'Something wrong! Customer has been not updated');
      }
    );
  }

  error(err, message) {
    console.log(err);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

  resetCustomer() {
    this.customer = new Customer();
    // console.log(this.customer);
  }

}
