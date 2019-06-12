import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Payment, Methods } from '../../models/order-models';
import { OrderService } from '../../order.service/order.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Helpers } from '../../../../../helpers';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';

declare let $:any;

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit, OnDestroy {

  payment: Payment;
  paymentList: Payment[] = [];
  edit: boolean;
  loader: boolean;
  order_id: number;
  path: string;
  methodsAmount : Methods = new Methods();
  index: number;
  pId: number;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private orderS: OrderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private alertS: AlertService,
    private modalService: NgbModal,
  ) { 
    this.paymentList = activeRoute.snapshot.data['payment'].data;
    this.path = this.activeRoute.snapshot['_routerState'].url;
    this.order_id = parseInt(this.orderS.getOrderId(this.activeRoute));
  }

  ngOnInit() {
    $('.native-routing-container').scrollTop(0,0);
    this.getAmount();
    this.initAdd();
  }

  ngOnDestroy() {
    if (this.path.includes('details')) {
      this.orderS.update({data: this.paymentList, from: 'PAYMENT', update: true});
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

  getAmount() {
    this.orderS.getPaymentAmount(this.order_id).subscribe(
      res => {
        this.methodsAmount.total_amount = res.data.total_amount;
        this.methodsAmount.payment_method = Object.values(res.data.offlinePaymentMethod);
        // console.log(res);
      }, err => console.log(err)
    );
  }

  initAdd() {
    this.edit = false;
    this.payment = new Payment();
  }

  submitPayment(form) {
    this.loader = true;
    this.payment.type = 2;
    this.payment.order_id = this.order_id;
    this.payment.content_id = 4;
    // console.log(this.payment);
    this.orderS.addPayment(this.payment).then(
      res => {
        this.loader = false;
        // console.log(res);
        this.paymentList.push(res.result.data);
        this.alertS.success(this.alertContainer, 'Payment has been added', true, 5000);
        this.initAdd();
      }
    ).catch(
      err => this.error(err, 'Something wrong! Payment has been not added')
    );
  }

  editPayment(pay, i) {
    this.edit = true;
    this.payment = new Payment();
    this.payment = this.orderS.formatePaymentEdit(pay);
    this.index = i;
  }

  updatePayment() {
    this.loader = true;
    console.log(this.payment);
    this.orderS.updatePayment(this.payment).then(
      res => {
        this.loader = false;
        // console.log(res);
        this.paymentList[this.index] = res.result.data;
        this.alertS.success(this.alertContainer, 'Payment has been updated', true, 5000);
        this.initAdd();
      }
    ).catch(
      err => this.error(err, 'Something wrong! Payment has been not updated')
    );
  }

  deletePayment(id,i) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result) => {
      if (result) {
        Helpers.setLoading(true);
        this.archivePayment(id, i);
      }
    }, (res) => {
      console.log(res);
    });
  }

  archivePayment(id, i) {
    this.orderS.deletePayment(id).then(
      res => {
        Helpers.setLoading(false);
        this.alertS.success(this.alertContainer, 'Payment has been deleted', true, 5000);
        this.paymentList.splice(i, 1);
      }
    ).catch (
      err => this.error(err, 'Something wrong! Payment has been not deleted')
    );
  }

  error(err, message) {
    this.loader = false;
    Helpers.setLoading(false);
    this.pId = null;
    console.log(err);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

  trackPayment(index, pay) {
    return pay ? pay.id : null;
  }

  get status () {
    const data = this.paymentList.find( f => f.payment_method === 'Capture');
    return data ? true : false;
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
    // console.log(pay);
    const data = {
      transaction_id: pay.transaction_id,
      order_id: this.order_id,
      amount: pay.payment_amount,
      id: pay.id
    }
    this.orderS.callVoid(data).then(
      res => {
        if(res.result.data.success) {
          this.getPaymentList();
          this.alertS.success(this.alertContainer, res.result.data.response_text, true, 3000);
        } else {
          this.alertS.error(this.alertContainer, res.result.data.response_text, true, 3000);
        }
        this.pId = null;
      }
    ).catch (
      err => this.error(err, 'Something wrong!!!')
    );
  }

  refund(pay) {
    if(this.status) {
      pay['payment_method'] = 'Capture'
    }
    sessionStorage.setItem('pay', JSON.stringify(pay));
    const newpath = this.path.replace('payment', 'refund');
    this.router.navigate([newpath]);
  }

  captured(pay) {
    this.pId = pay.id;
    // console.log(pay);
    const data = {
      transaction_id: pay.transaction_id,
      order_id: this.order_id,
      amount: pay.payment_amount,
      id: pay.id
    }
    this.orderS.callCaptured(data).then(
      res => {
        if(res.result.data.success) {
          this.getPaymentList();
          this.alertS.success(this.alertContainer, res.result.data.response_text, true, 3000);
        } else {
          this.alertS.error(this.alertContainer, res.result.data.response_text, true, 3000);
        }
        this.pId = null;
      }
    ).catch (
      err => this.error(err, 'Something wrong!!!')
    );
  }
  

}
