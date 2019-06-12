import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CheckOut } from '../../../cart-service/cart.models';
import { GET_USER } from '../../../../globals/_classes/functions';
import { CartService } from '../../../cart-service/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  paymentMethods = ['Online','Offline'];
  termsCondition = true;
  billingForm: CheckOut;
  errorFiled: boolean;
  shiping: boolean;
  buy: boolean;
  sameAs: boolean = false;
  shipping_method;

  @Output('openBilling') openBilling: EventEmitter<any> = new EventEmitter();

  constructor(
    private cartS: CartService
  ) { }

  ngOnInit() {
    this.addInfoToBill();
  }

  addInfoToBill() {
    this.cartS.checkout.subscribe(
      val => {
        if (val) {
          let bill = this.cartS.getSessionData('billInfo');
          if (bill) {
            this.billingForm = bill;
          } else {
            this.billingForm = new CheckOut();
            this.billingForm.type = 1;
          }
          this.billingForm.pickup = this.cartS.getSessionData('pickup');
          this.billingForm.delivery_charge = this.cartS.getSessionData('cartList').delivery_charge;
          this.billingForm.token = this.cartS.getSessionData('cartToken');
          this.billingForm.driving_license_required = this.checkDrivingLicense();
          this.errorFiled = false;
          this.sameAs = this.cartS.getSessionData('sameAs') ? this.cartS.getSessionData('sameAs') : false;
          this.shipping_method = this.cartS.getSessionData('cartList').shipping_method;
          this.shiping = this.shipping_method == 1 ? false : true;
          this.buy = this.cartS.checkBuy();
          if(this.buy && !this.shiping) {
            setTimeout(() => {
              this.resetShipping();
              // this.submitBilling();
            }, 100);
          }
          if(!this.buy && !this.shiping && this.billingForm.shipping_address1) {
            this.sameAs = false;
            this.resetShipping();
          }
        }
        const address = this.cartS.getSessionData('shippingAddress');
        if(address) {
          this.billingForm = {...this.billingForm, ...address};
        }
      }
    );
  }

  get disabledField() {
    return [3,4,5].includes(this.shipping_method);
  }

  submitBilling() {
    if(this.billingForm.driving_license_required && !this.billingForm.driving_license) {
      this.errorFiled = true;
    } else {
      this.billingForm.salesman = GET_USER().user_id;
      this.cartS.setSessionData('billInfo', this.billingForm);
      this.cartS.setSessionData('sameAs', this.sameAs);
      this.cartS.goToPayment(true);
      this.openBilling.emit();
    }
  }

  checkDrivingLicense() {
    const cart = this.cartS.getSessionData('cartList');
    for(let c of cart) {
      if(c.driving_license_required) {
        return true;
      }
    }
    return false;
  }

  checkForShipping(e) {
    this.sameAs = e.target.checked;
    if(this.sameAs) {
      this.billingForm.shipping_first_name = this.billingForm.first_name;
      this.billingForm.shipping_last_name = this.billingForm.last_name;
      this.billingForm.shipping_address1 = this.billingForm.address_line1;
      this.billingForm.shipping_city = this.billingForm.city;
      this.billingForm.shipping_mobile = this.billingForm.mobile;
      // this.billingForm.shipping_state = this.billingForm.state_id;
      this.billingForm.shipping_zipcode = this.billingForm.zipcode;
    } else {
      this.resetShipping();
    }
  }

  resetShipping() {
    this.billingForm.shipping_first_name = null;
    this.billingForm.shipping_last_name = null;
    this.billingForm.shipping_address1 = null;
    this.billingForm.shipping_address2 = null;
    this.billingForm.shipping_city = null;
    this.billingForm.shipping_mobile = null;
    // this.billingForm.shipping_state = null;
    this.billingForm.shipping_zipcode = null;
  }

}
