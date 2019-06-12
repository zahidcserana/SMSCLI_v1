import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart-service/cart.service';
import { SidebarService } from '../sidebar-service/sidebar.service';

declare let $:any;

@Component({
  selector: 'cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  checkOut: boolean;
  payment: boolean;
  sessionEmpty = ['cartList', 'cartToken', 'billInfo', 'orderId', 'sameAs', 'pickup', 'log', 'item_log', 'coupon', 'deliveryCharge', 'shippingAddress'];
  show: boolean;

  constructor(
    private cartS: CartService,
    private sidebarS: SidebarService
  ) { }

  ngOnInit() {
    this.sidebarS.openFrom.subscribe(
      val => {
        if(!val) {
          this.backToCart();
        }
      }
    );
  }

  checkOutOpen() {
    this.checkOut = true;
    this.payment = false;
    this.show = false;
    this.sidebarS.adjustWidtInCart();
    $('.native-routing-container-cart').scrollTop(0, 0);
  }

  openBilling() {
    this.payment = true;
    this.sidebarS.adjustWidtInCart();
    $('.native-routing-container-cart').scrollTop(0, 0);
    this.cartS.cancelBoltTerminal(null);
  }

  backToCart() {
    this.checkOut = false;
    this.payment = false;
    this.show = false;
    this.sidebarS.adjustWidtInCart();
    $('.native-routing-container-cart').scrollTop(0, 0);
  }

  backToContact() {
    this.payment = false;
    this.show = false;
    this.sidebarS.adjustWidtInCart();
    $('.native-routing-container-cart').scrollTop(0, 0);
  }


  ClearFullCart(y?: boolean) {
    if (y) {
      this.backToCart();
      const cartToken = this.cartS.getSessionData('cartToken');
      if(cartToken) {
        this.cartS.deleteAllCart(cartToken).subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      }
    } else {
      this.show = true;
      this.sidebarS.adjustWidtInCart();
    }
    this.sessionEmpty.forEach((name) => {
      this.cartS.removeSessionData(name);
    });
    this.cartS.cartNoChange(null);
    this.cartS.cancelBoltTerminal(null);
    $('.native-routing-container-cart').scrollTop(0, 0);
  }

}
