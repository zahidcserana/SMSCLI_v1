import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {product_image} from '../../../../globals/endPoint/config';
import {Cart, CartItem} from '../../../home-modules/type.model';
import {CartService} from '../../../home-service/cart.service';
import {ProductService} from '../../../home-service/product.service';


@Component({
    selector: 'app-order-summery',
    templateUrl: './order-summery.component.html',
    styleUrls: ['./order-summery.component.css']
})
export class OrderSummeryComponent implements OnInit {
    token: string;
    cart: Cart;
    img_url = product_image;
    cartItems: CartItem[] = [];
    @Input() contents: any;

    constructor(private cartService: CartService,
                private router: Router, private service: ProductService) {
        this.loadCart();
        this.cartService.cartReload.subscribe(val => {
            if (val.reload) {
                this.loadCart();
            }
        });
    }

    loadCart() {
        this.token = localStorage.getItem('token');
        if (this.cartService.userCart) {
            this.cart = this.cartService.userCart;
            this.cartItems = this.cart.cart_items ? this.cart.cart_items : [];
        }
    }

    ngOnInit() {
    }


    navigate(e) {
        this.router.navigate([e]);
    }


}
