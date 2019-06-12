import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Payment, Methods } from '../../models/order-models';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../order.service/order.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../../../modules/alert/alert.service';

@Component({
  selector: 'order-details-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['../order-details.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  paymentList: Payment[] = [];
  sub: Subscription[] = [];
  order_id: number;
  methodsAmount: Methods = new Methods();
  pId: number;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private activeRoute: ActivatedRoute,
    private alertS: AlertService,
    private router: Router,
    private orderS: OrderService
  ) {
    this.sub[0] = this.activeRoute.parent.params.subscribe(
      val => {
        this.order_id = val['order_id'];
        this.getAmount();
        this.getPaymentList();
      }
    );
  }

  ngOnInit() {
    sessionStorage.removeItem('pay');
    this.updateList();
  }

  ngOnDestroy() {
    for (let s of this.sub) {
      s.unsubscribe();
    }
  }

  getPaymentList() {
    this.orderS.getPaymentList(this.order_id).subscribe(
      res => {
        this.paymentList = res.data;
      },
      err => console.log(err)
    );
  }

  updateList() {
    this.sub[1] = this.orderS.updateData.subscribe(
      val => {
        if (val.update && val.from == 'PAYMENT') {
          // console.log(val);
          if (val.data) {
            this.paymentList = val.data;
          } else {
            this.getPaymentList();
          }
          this.getAmount();
        } else if (val.update && val.from == 'ITEMS') {
          this.getAmount();
        }
      }
    );
  }

  getAmount() {
    this.orderS.getPaymentAmount(this.order_id).subscribe(
      res => {
        this.methodsAmount.total_amount = res.data.total_amount;
        this.methodsAmount.payment_method = Object.values(res.data.offlinePaymentMethod);
        // console.log(res);
      }, err => console.log(err)
    );
  }

  get status () {
    const data = this.paymentList.find( f => f.payment_method === 'Capture');
    return data ? true : false;
  }

  trackPayment(index, pay) {
    return pay ? pay.id : null;
  }

  getTotalPaid(data) {
    return this.orderS.getPaidTotal(data);
  }

  openSummary(id, icon) {
    $('#' + id).toggleClass('dis-block');
    $('#' + icon).toggleClass('fa-minus-circle');
  }

  getTextResponse(text) {
    return this.orderS.getTextResponse(text);
  }

  trackbyText(index, data) {
    return data ? data.id : null;
  }

  voidBtn(pay) {
    this.pId = pay.id;
    console.log(pay);
    const data = {
      transaction_id: pay.transaction_id,
      order_id: this.order_id,
      amount: pay.payment_amount,
      id: pay.id
    }
    this.orderS.callVoid(data).then(
      res => {
        if (res.result.data.success) {
          this.alertS.success(this.alertContainer, res.result.data.response_text, true, 3000);
          this.orderS.update({ data: null, from: 'PAYMENT', update: true });
        } else {
          this.alertS.error(this.alertContainer, res.result.data.response_text, true, 3000);
        }
        this.pId = null;
      }
    ).catch(
      err => this.error(err, 'Something wrong!!!')
    );
  }

  refund(pay) {
    if (!sessionStorage.getItem('pay')) {
      if(this.status) {
        pay['payment_method'] = 'Capture'
      }
      sessionStorage.setItem('pay', JSON.stringify(pay));
    }
    this.router.navigate([`edit/refund`], { relativeTo: this.activeRoute });
  }

  captured(pay) {
    this.pId = pay.id;
    console.log(pay);
    const data = {
      transaction_id: pay.transaction_id,
      order_id: this.order_id,
      amount: pay.payment_amount,
      id: pay.id
    }
    this.orderS.callCaptured(data).then(
      res => {
        if (res.result.data.success) {
          this.alertS.success(this.alertContainer, res.result.data.response_text, true, 3000);
          this.orderS.update({ data: null, from: 'PAYMENT', update: true });
        } else {
          this.alertS.error(this.alertContainer, res.result.data.response_text, true, 3000);
        }
        this.pId = null;
      }
    ).catch(
      err => this.error(err, 'Something wrong!!!')
    );
  }

  error(err, message) {
    this.pId = null;
    console.log(err);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

}
