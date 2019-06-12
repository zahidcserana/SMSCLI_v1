import { Component, OnInit, Input } from '@angular/core';
import { product_image, EndPoint } from '../../../../globals/endPoint/config';
import { CartService } from '../../../home-service/cart.service';
import { Cart, CartItem } from '../../../home-modules/type.model';



@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  img_url = product_image;
  order_id: number;
  cart: Cart;
  cartItems: CartItem[] = [];
  api: string = EndPoint;

  @Input() contents: any;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.getOrderId.subscribe(val => {
      this.order_id = val.order_id;
    });
    if (this.cartService.userCart) {
      this.cart = this.cartService.userCart;
      this.cartItems = this.cart.cart_items;
    }
  }

}


