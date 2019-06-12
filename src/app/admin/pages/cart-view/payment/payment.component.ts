import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy, HostListener, AfterContentInit, ViewContainerRef, ComponentFactoryResolver, Type, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../../modules/alert/alert.service';
import { product_image, EndPoint } from '../../../../globals/endPoint/config';
import { Subscription } from 'rxjs';
import { CartService } from '../../../cart-service/cart.service';
import { iframe, GET_USER, formateRentType } from '../../../../globals/_classes/functions';
import { CardConnectCheckoutComponent } from '../../../../modules/card-connect-checkout/card-connect-checkout.component';
import { StripeCheckoutComponent } from '../../../../modules/stripe-checkout/stripe-checkout.component';
import { PaypalCheckoutComponent } from '../../../../modules/paypal-checkout/paypal-checkout.component';
import { AuthorizeDotNetCheckoutComponent } from '../../../../modules/authorizeDotNet-checkout/authorizeDotNet-checkout.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  loader: boolean;
  cartItems: any;
  img_url = product_image;
  payment_amount: any = 0;
  is_online = true;
  mode = 3;
  paymentInfo; any;
  oflinePaymentmethod = ['Paid in Cash','Paid in Credit'];
  order_id: number;
  api = EndPoint;
  orderDone: boolean;
  payment_method = 'Paid in Cash';
  payment_error: boolean;
  sub: Subscription[] = [];
  changeAmount = 0;
  responseText;
  loaderApi: boolean;
  token: number;
  maxLength: number = 15;
  terminalHSN;
  boltSub: Subscription;
  bolt: boolean;
  allGateways = [];
  componentRef: ComponentRef<any>;
  gateImage: string = '';



  @Output('cart') cart: EventEmitter<any> = new EventEmitter();
  @ViewChild('cardConect', { read: ViewContainerRef }) cardConect: ViewContainerRef;
  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private alert: AlertService,
    private router: Router,
    private cartS: CartService,
    private resolver: ComponentFactoryResolver
  ) {
    this.getBillInfo();
  }


  ngOnInit() {
    this.cartS.boltOn.subscribe(
      val => {
        if(val) {
          this.boltSub.unsubscribe();
          this.loaderApi = false;
          this.responseText = null;
        }
      }
    );
  }

  ngOnDestroy() {
    for (let s of this.sub) {
      s.unsubscribe();
    }
  }

  getPaymentGateway() {
    this.cartS.getGateways().subscribe(
      res => {
        this.bolt = false;
        this.allGateways = res.filter( f => {
          if(f.name.toLowerCase() === 'boltcardconnect') {
            this.bolt = true;
            return false;
          } else {
            return f.status === 1 ? true : false;
          } 
        });
      }
    );
  }

  gotoDetails() {
    this.router.navigate([`/admin/reservations/${this.order_id}/details`]);
  }

  checkPayAmount() {
    let index = this.payment_amount.indexOf('.');
    this.maxLength = index < 0 ? 15 : index + 3;
    const totalAmount = typeof this.cartItems.total === 'string' ? parseFloat(this.cartItems.total) : this.cartItems.total;
    const pay = typeof this.payment_amount === 'string' ? parseFloat(this.payment_amount) : this.payment_amount;
    if ( pay < totalAmount) {
      this.payment_error = true;
    } else {
      this.payment_error = false;
    }

    this.changeAmount = pay - totalAmount;
  }

  getBillInfo() {
    this.getPaymentGateway();
    this.sub[0] = this.cartS.payment.subscribe(
      val => {
        if (val) {
          this.paymentInfo = this.cartS.getSessionData('billInfo');
          this.paymentInfo.type = parseInt(this.paymentInfo.type);
          this.is_online = this.paymentInfo.type == 1 && this.allGateways.length > 0 ? true : false;
          if (this.is_online) {
            this.mode = 1;
          } else {
            this.mode = 3;
          }
          this.orderDone = false;
          this.getTotalAmount();
          this.changeMode(this.mode);
        }
      }
    );
  }

  getDate(d) {
    return this.cartS.formateListDate(d);
  }

  getType(d, t) {
    return d && t ? formateRentType(d, t) : '';
  }

  changeMode(mode) {
    this.loaderApi = false;
    if (mode == 3) {
      this.paymentInfo['type'] = 2;
      this.is_online = false;
      this.payment_amount = this.cartItems.total;
      let index = this.payment_amount.indexOf('.');
      this.maxLength = index < 0 ? 15 : index + 3;
      // console.log(this.payment_amount);
    } else {
      this.paymentInfo['type'] = 1;
      this.is_online = true;
      if (mode == 2) {
        if(GET_USER().terminal_id) {
          this.applyBackdrop();
          $('.bacdrop-payment').removeClass('dis-none');
          $('.bacdrop-payment').addClass('dis-block');
          this.loaderApi = true;
          this.swipeApiCall();
        } else {
          this.alert.info(this.alertContainer, 'Terminal is not selected. Please select terminal', true, 3000);
          this.token = null;
        }
      } else {
        this.token = null;
        iframe('cardName', '.iFram');
      }
    }
  }

  applyBackdrop() {
    const w = $(window).width();
    const h = $(window).height();
    $('.bacdrop-payment').css('width', w);
    $('.bacdrop-payment').css('height', h);
  }

  swipeApiCall() {
    const data = {
      location_id: GET_USER().location_id,
      amount: typeof this.cartItems.total == 'string' ? parseFloat(this.cartItems.total) : this.cartItems.total,
      terminal_id: GET_USER().terminal_id,
      token: this.cartS.getSessionData('cartToken')
    }
    this.boltSub = this.cartS.getCreditCardSwipe(data).subscribe(
      res => {
        this.loaderApi = false;
        // console.log(res);
        if (res.data.success) {
          this.responseText = res.data.payment.response_text;
          this.terminalHSN = res.data.payment.terminal;
          this.alert.success(this.alertContainer, res.data.response_text, true, 3000);
        } else {
          this.responseText = null;
          this.alert.error(this.alertContainer, res.data.response_text, true, 3000);
        }
        const log = this.cartS.getSessionData('log') ? this.cartS.getSessionData('log') : [];
        log.push(res.data.log_text);
        this.cartS.setSessionData('log', log);
        $('.bacdrop-payment').removeClass('dis-block');
        $('.bacdrop-payment').addClass('dis-none');
      },
      err => {
        console.log(err);
        $('.bacdrop-payment').removeClass('dis-block');
        $('.bacdrop-payment').addClass('dis-none');
        this.loaderApi = false;
        this.responseText = null;
        this.alert.error(this.alertContainer, 'Your transaction failed. Please try again', true, 3000);
      }
    );
  }


  submit(e) {
    this.paymentInfo = Object.assign(this.paymentInfo, e);
    this.submitPayment();
  }

  submitSwipe(f) {
    this.loader = true;
    this.paymentInfo['swipe'] = true;
    this.paymentInfo['response_text'] = this.responseText;
    this.paymentInfo['terminal'] = this.terminalHSN;
    this.paymentInfo['log_text'] = this.cartS.getSessionData('log') ? this.cartS.getSessionData('log') : [];
    this.paymentInfo['payment_amount'] = this.cartItems.total;
    this.submitPayment();
  }

  offlinePayment() {
    this.loader = true;
    this.paymentInfo['amount_tendered'] = parseFloat(this.payment_amount);
    this.paymentInfo['change_amount'] = this.changeAmount;
    this.paymentInfo['terminal_id'] = GET_USER().terminal_id;
    this.paymentInfo['accttyppe'] = this.payment_method;
    // console.log(this.paymentInfo);
    this.submitPayment();
  }

  submitPayment() {
    this.paymentInfo['currency'] = 'USD'
    this.paymentInfo['is_admin'] = true;
    this.paymentInfo['delivery'] = this.cartS.getSessionData('deliveryCharge');
    this.paymentInfo['location'] = GET_USER().location_id;
    this.paymentInfo['item_log'] = JSON.parse(sessionStorage.getItem('item_log')) ? JSON.parse(sessionStorage.getItem('item_log')) : [];
    this.cartS.addPayment(this.paymentInfo)
      .then(res => {
        this.loader = false;
        if( this.componentRef) {
          this.componentRef.instance.loader = false;
        }
        if (res.result.data) {
          if (res.result.data.payment.success) {
              this.order_id = res.result.data.payment.order_id;
              // this.printRecipet();
              this.orderDone = true;
              this.cart.emit();
              this.token = null;
              this.reloadCanlender();
          } else {
              $('custom-alert').css('display', 'block');
              this.alert.error(this.alertContainer, res.result.data.payment.message + '!!!', true, 3000);
          }
        } else {
          this.alert.error(this.alertContainer, res.result.error, true, 3000);
        }
      })
      .catch(err => {
        console.log(err);
        this.loader = false;
        if( this.componentRef) {
          this.componentRef.instance.loader = false;
        }
        this.alert.error(this.alertContainer, "Payment is failed. Please try again.", true, 3000);
      });
  }

  private reloadCanlender() {
    if(this.router.url.includes('/calender')) {
      this.cartS.reloadCalander.emit(true);
    }
  }

  private printRecipet() {
    const data = {
      order_id: this.order_id
    }
    if (!this.is_online) {
      data['amount_tendered'] = parseFloat(this.payment_amount);
      data['change_amount'] = this.changeAmount;
    }
    this.cartS.printReceipt(data).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }


  getTotalAmount() {
    this.cartItems = this.cartS.getSessionData('cartList');
  }

  changeGateway(name) {
    if(name && name!=='null') {
      this.loadComponent(name);
    } else {
      this.componentRef.destroy();
      this.gateImage = '';
    }
  }

  private loadComponent(name) {
    switch (true) {
      case name.toLowerCase() === 'cardconnect':
        this.createComponent(CardConnectCheckoutComponent); 
        this.gateImage = './assets/img/home/CardConnect-logo.jpg';
        break;
      case name.toLowerCase() === 'stripe':
        this.createComponent(StripeCheckoutComponent, name); 
        this.gateImage = './assets/img/home/stripe.png';
        break;
      case name.toLowerCase() === 'paypal':
        this.createComponent(PaypalCheckoutComponent); 
        this.gateImage = './assets/img/home/paypal-logo.png';
        break; 
      case name.toLowerCase() === 'authorize.net':
        this.createComponent(AuthorizeDotNetCheckoutComponent); 
        this.gateImage = './assets/img/home/Authorize.net-Logo.jpg';
        break;  
    }
  }

  private createComponent(com: Type<any>, name?: string) {
    const factory = this.resolver.resolveComponentFactory(com);
    this.cardConect.clear();
    this.componentRef = this.cardConect.createComponent(factory);
    this.componentRef.instance.loaderColor = 'm-loader--skin-dark';
    this.componentRef.instance.btnColor = 'btn-brand';
    this.componentRef.instance.onSelectPayment.subscribe( e => this.submit(e));
    if(name) {
      const data = this.allGateways.find ( f => f.name.toLowerCase() === name.toLowerCase());
      this.componentRef.instance.key = data.config['publishable_key'];
    }
  }


}
