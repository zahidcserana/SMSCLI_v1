import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { product_image } from '../../../globals/endPoint/config';
import { AlertService } from '../../../modules/alert/alert.service';
import { ShippingMethod, Coupon, Cart, VariantSet, CartItem } from '../../home-modules/type.model';
import { CartService } from '../../home-service/cart.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContentResoveService } from '../../home-service/contetn-resolve.service';
import { bannerImage } from '../../home-modules/layout.config';

@Component({
    selector: 'app-cart-layout',
    templateUrl: './cart-layout.component.html',
    styleUrls: ['./cart-layout.component.css']
})
export class CartLayoutComponent implements OnInit, OnDestroy {
    cart: Cart;
    variants: VariantSet[];
    contents: any;
    bannerImage: any;
    img_url = product_image;
    cartItems: CartItem[] = [];
    coupon: Coupon = { code: '', amount: 0, set_coupon: false, unit_type: null };
    shipping;
    loader: boolean;
    @ViewChild('hasAlert') alertContainer: ElementRef;
    @ViewChild('CouponAlert') alertCoupon: ElementRef;
    @ViewChild('shippingAlert') shippingAlert: ElementRef;
    sub: Subscription;

    constructor(private route: ActivatedRoute,
        private cartServie: CartService,
        private router: Router,
        private alert: AlertService,
        private contentService: ContentResoveService
    ) {}

    ngOnInit() {
        this.sub = this.route.data.subscribe(res => {
            this.shipping = res.shipping;
            this.cart = this.route.snapshot.data.carts;
            this.cartItems = this.cart.cart_items;
            this.cartServie.saveCartsInlocalStorage(this.cart);
        });

        this.cartServie.cartReload.subscribe(res => {
            if (res.reload) {
                this.loadCart();
            }
        });
        this.contents = this.contentService.contents ? this.contentService.contents : [];
        this.getBannerImage();
    }

    decreaseQuant(cart: CartItem, i) {
        if (cart.quantity > 1) {
            cart.quantity--;
            const obj = {
                id: cart.id,
                token: cart.token,
                sales_tax: cart.sales_tax,
                increment: 0,
                price: cart.price,
                rental_duration: cart.rental_duration
            };
            this.updateCart(obj, cart.rental_type);
        }

    }

    increaseQuant(cart: CartItem, i) {
        if (this.checkReservedQuantity(cart) > 0) {
            cart.quantity++;
            const obj = {
                id: cart.id,
                token: cart.token,
                increment: 1,
                sales_tax: cart.sales_tax,
                price: cart.price,
                rental_duration: cart.rental_duration
            };
            this.updateCart(obj, cart.rental_type);
        }

    }

    removeCart(item: CartItem) {
        this.cartServie.removeCart(item);
    }

    applyCoupon(form: NgForm) {
        this.loader = true;
        this.cartServie.applyCoupon({ token: this.cart.token, coupon: form.value.couponCode }).toPromise()
            .then(res => {
                if (res.status === 'OK') {
                    this.cartServie.saveCartsInlocalStorage(res.result.data);
                    this.loader = false;
                    this.loadCart();
                    $('custom-alert').css('display', 'block');
                    this.alert.success(this.alertCoupon, 'Coupon Accepted ', true, 5000);
                } else {
                    this.loader = false;
                    $('custom-alert').css('display', 'block');
                    this.alert.error(this.alertCoupon, 'Invalid Coupon !!  ', true, 3000);
                }
            });
    }


    selectSgippingMethod(e) {
        if (e.res) {
            this.loadCart();
            this.alert.success(this.shippingAlert, e.message, true, 3000);
        } else {
            this.alert.error(this.shippingAlert, e.message, true, 3000);
        }
    }

    updateCart(data, rent) {
        this.cartServie.updateCart(Number(localStorage.getItem('cart_id')), data)
            .then(res => {
                if (res.status === 'OK') {
                    this.cartServie.saveCartsInlocalStorage(res.result.data);
                    this.cartServie.cartReload.next({ reload: true, items: res.result.data.cart_items });
                    this.loader = false;
                    this.loadCart();
                    this.alert.success(this.alertContainer, 'Quantity updated', true, 3000);
                } else {
                    this.loader = false;
                    $('custom-alert').css('display', 'block');
                    this.alert.error(this.alertContainer, 'Quantity not updated. Please try again ', true, 3000);
                }
            })
            .catch(err => {
                console.log(err);
                this.loader = false;
                $('custom-alert').css('display', 'block');
                this.alert.error(this.alertContainer, 'Something wrong !! Please try again', true, 3000);
            });

    }

    checkOut() {
        this.router.navigate(['/checkout']);
    }

    calculateTotalPrice(cart: CartItem) {
        if (cart.rental_duration) {
            return Number(cart.rental_duration) * cart.price * cart.quantity;
        } else {
            return cart.price * cart.quantity;
        }
    }

    formate(d: string) {
        const s: string = d.split('T')[0];
        return new Date(s);
    }

    BackToPrevious() {
        this.router.navigate(['']);
    }

    checkReservedQuantity(item: CartItem) {
        let time = 1;
        let count = 0;
        const reserved_qty = 0;
        const type = item.rental_type ? 'rent' : 'buy';
        if (item.rental_type !== 'hourly') {
            time = item.term;
        }
        this.cartItems.filter(cItem => {
            if (cItem.variants_products_id === item.variants_products_id) {
                count += cItem.quantity;
            }
        });
        return item.product_variant.quantity['quantity'] - (reserved_qty + count);
    }


    loadCart() {
        this.cart = this.cartServie.userCart;
        this.cartItems = this.cart && this.cart.cart_items ? this.cart.cart_items : [];
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getBannerImage() {
        if (this.contents.cartBanner) {
            this.bannerImage = bannerImage(this.contents.cartBanner);
        }
    }
}
