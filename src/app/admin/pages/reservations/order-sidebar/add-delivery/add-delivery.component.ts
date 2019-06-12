import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../order.service/order.service';
import { Helpers } from '../../../../../helpers';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { Payment } from '../../models/order-models';
import { GET_USER } from '../../../../../globals/_classes/functions';
import { WarningDialogBoxComponent } from './dialog-box/dialog-box.component';

declare let $:any;

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit, OnDestroy {
  pay: any;
  loader: boolean;
  refundList = [];
  order_id;
  refunds = [];
  path: string;
  payment: Payment = new Payment();
  online: boolean;
  refundAmount = 0;
  capturedAmount: number;
  isCap: boolean;
  isAuthorized: boolean;
  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private orderS: OrderService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertS: AlertService,
    private modalService: NgbModal
  ) {
    this.refundList = activeRoute.snapshot.data['refund'].data;
    // console.log(this.refundList);
    this.path = this.activeRoute.snapshot['_routerState'].url;
    this.order_id = this.orderS.getOrderId(this.activeRoute);
    this.payment = JSON.parse(sessionStorage.getItem('pay'));
    this.online = this.payment.type == 1 ? true : false;
    this.capturedAmount = this.payment.payment_amount;
    this.pay = JSON.parse(sessionStorage.getItem('pay'));
    this.isCap = this.payment.payment_method === 'Capture' || this.payment.payment_method === 'Queued for Capture' ? false : true;
    this.isAuthorized = this.payment.payment_method === 'Authorized' ? true : false;
    if (this.pay.payment_method = 'Capture') {
      this.refundAmount = this.capturedAmount;
    }
    if (this.isAuthorized) {
      this.refundAmount = 0.00;
      this.refundAmount.toFixed(2);
    }
  }

  ngOnInit() {
    $('.native-routing-container').scrollTop(0, 0);
    this.getRefunds();
  }

  ngOnDestroy() {
    if (this.path.includes('details')) {
      this.orderS.update({ data: null, from: 'PAYMENT', update: true });
    }
    sessionStorage.removeItem('pay');
  }

  reloadDetailsAgain() {
    this.orderS.update({ data: null, from: 'PAYMENT', update: true });
  }

  getRefundAmount(amount) {
    if (!amount) {
      this.refundAmount = 0.00;
    } else {
      this.refundAmount = parseFloat(amount);
    }

    this.capturedAmount = this.payment.payment_amount - this.refundAmount;
  }

  getRefunds() {
    this.orderS.getRefunds(this.order_id).subscribe(
      res => {
        this.refunds = res.data;
        // console.log(this.refunds);
      }
    );
  }

  refundListTrack(index, track) {
    return track ? track.id : null;
  }

  refundsTrack(index, track) {
    return track ? track.id : null;
  }

  getDate(d) {
    if (d) {
      return new Date(d);
    }
  }

  submit(form) {
    if (parseFloat(form.value.amount) > this.payment.payment_amount) {
      this.waringBox();
    } else {
      const modalRef = this.modalService.open(DialogBoxComponent, {
        centered: true
      });
      modalRef.componentInstance.massage = 'Do you want to Change status to "Returned" with this submission?';
      modalRef.result
        .then((result) => {
          if (result) {
            if (this.online) {
              if (this.isAuthorized) {
                this.captured(form, 1);
              } else {
                this.onlineSubmit(form, 1);
              }
            } else {
              this.addRefund(form, 1);
            }
          } else {
            if (this.online) {
              this.captured(form, 0);
            } else {
              this.addRefund(form, 0);
            }
          }
        }, (res) => {
          console.log(res);
        });
    }
  }

  addRefund(form, status) {
    this.loader = true;
    const data = {
      order_id: this.order_id,
      note: form.value.note,
      amount: parseFloat(form.value.amount),
      change_status: status,
      terminal_id: GET_USER().terminal_id
    }
    // console.log(data);
    this.orderS.addRefund(data).then(
      res => {
        this.loader = false;
        // console.log(res);
        this.refunds = res.result.data;
        this.alertS.success(this.alertContainer, 'Refund has been added', true, 5000);
        form.form.reset();
        this.reloadDetailsAgain();
      }
    ).catch(
      err => this.error(err, 'Something wrong! Refund has been not added')
    );
  }

  waringBox() {
    const modalRef = this.modalService.open(WarningDialogBoxComponent, {
      centered: true
    });
    modalRef.componentInstance.massage = 'The refund amount must not be greater than the payment amount';
  }

  deleteRefund(id, i) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
      .then((result) => {
        if (result) {
          Helpers.setLoading(true);
          this.archiveRefund(id, i);
        }
      }, (res) => {
        console.log(res);
      });
  }

  archiveRefund(id, i) {
    this.orderS.deleteRefund(id).then(
      res => {
        Helpers.setLoading(false);
        this.alertS.success(this.alertContainer, 'Refund has been deleted', true, 5000);
        this.refunds.splice(i, 1);
        this.refunds = res.result.data;
      }
    ).catch(
      err => this.error(err, 'Something wrong! Refund has been not deleted')
    );
  }

  error(err, message) {
    this.loader = false;
    Helpers.setLoading(false);
    console.log(err);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

  captured(form, status) {
    this.loader = true;
    const data = {
      transaction_id: this.payment.transaction_id,
      order_id: this.order_id,
      amount: parseFloat(this.capturedAmount.toFixed(2)),
      id: this.payment.id
    }
    // console.log(data);
    this.orderS.callCaptured(data).then(
      res => {
        if (res.result.data.success) {
          this.alertS.success(this.alertContainer, res.result.data.response_text, true, 3000);
          // this.onlineSubmit(form, status);
          this.reloadDetailsAgain();
        } else {
          this.alertS.error(this.alertContainer, res.result.data.response_text, true, 3000);
        }
      }
    ).catch(
      err => this.error(err, 'Something wrong!!!')
    );
  }

  onlineSubmit(form, status) {
    const data = {
      transaction_id: this.payment.transaction_id,
      order_id: this.order_id,
      note: form.value.note,
      change_status: status,
      amount: parseFloat(form.value.amount)
    }
    // console.log(data);
    this.orderS.callRefund(data).then(
      res => {
        this.loader = false;
        if (res.result.data.success) {
          this.getRefunds();
          this.alertS.success(this.alertContainer, res.result.data.message, true, 3000);
          form.form.reset();
          this.refundAmount = null;
          this.payment.payment_method = 'Capture';
          this.reloadDetailsAgain();
        } else {
          this.alertS.error(this.alertContainer, res.result.data.message, true, 3000);
        }
      }
    ).catch(
      err => this.error(err, 'Something wrong!!!')
    );
  }

}
