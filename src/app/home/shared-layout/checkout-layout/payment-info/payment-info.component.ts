import {
  Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input
} from '@angular/core';
import { Router } from '@angular/router';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { Helpers } from '../../../../helpers';
import { PaymentGatewayComponent } from '../payment-gateway/payment-gateway.component';
import { Cart, Product } from '../../../home-modules/type.model';
import { CartService } from '../../../home-service/cart.service';



@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css']
})
export class PaymentInfoComponent implements OnInit {
  cart: Cart;
  unavailable_product: Product;
  order_error_show: boolean;
  paymentInfo = new Object();


  @Output() paymentConfirm = new EventEmitter();
  @ViewChild('hasAlert') alertContainer: ElementRef;
  @ViewChild('gateWay') gateWay: PaymentGatewayComponent;
  @Input() contents: any;


  constructor(
    private cartService: CartService,
    private router: Router,
    private alert: AlertService,
    private _script: ScriptLoaderService,
    ) {
    this.cart = this.cartService.userCart;
  }


  ngOnInit() {
    this._script.loadScripts('body', ['assets/js/home/jquery.creditCardValidator.js', 'assets/js/home/bootstrap.js']).then(result => {
      Helpers.setLoading(false);
    });
  }



  SelectPaymentGateway(event) {
    const billingInfo = this.cartService.getBillingInfo();
    this.paymentInfo = event;
    this.paymentInfo['currency'] = 'USD';
    this.paymentInfo['pickup'] = localStorage.getItem('pickup') ? Number(localStorage.getItem('pickup')) : '';
    this.paymentInfo['token'] = this.cart.token;
    this.paymentInfo['delivery'] = localStorage.getItem('deliveryCharge') ? JSON.parse(localStorage.getItem('deliveryCharge')) : '';
    const data = Object.assign(billingInfo, this.paymentInfo);
    this.cartService.addpayment(data)
      .then(res => {
        this.gateWay.offLoader();
        if (res.result.data) {
          if (res.result.data.availability.success) {
            if (res.result.data.payment.success) {
              this.cartService.getOrderId.next({ order_id: res.result.data.payment.order_id });
              localStorage.setItem('confirmOrder', String(1));
              this.cartService.cartReload.next({ reload: true});
              this.paymentConfirm.emit(true);
            } else {
              $('custom-alert').css('display', 'block');
              this.alert.error(this.alertContainer, res.result.data.payment.message + '!!!', true, 3000);
            }
          } else {
            this.unavailable_product = res.result.data.availability.product;
            this.order_error_show = true;
            setTimeout(() => {
              this.order_error_show = false;
            }, 6000);
          }
        } else {
          this.alert.error(this.alertContainer, res.result.error, true, 3000);
        }
      })
      .catch(err => {
        console.log(err);
        this.gateWay.offLoader();
      });
  }


  BacktoPrevious() {
    this.router.navigate(['checkout']);
  }

}


export interface OflinePaymentMethod {
  id: number;
  name: string;
}
