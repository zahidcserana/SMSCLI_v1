import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from '../../home-modules/type.model';
import { ContentResoveService } from '../../home-service/contetn-resolve.service';
import { CartService } from '../../home-service/cart.service';
import { bannerImage } from '../../home-modules/layout.config';


@Component({
    selector: 'checkout',
    templateUrl: './checkout-layout.component.html',
    styleUrls: ['./checkout-layout.component.css']
})
export class CheckoutLayoutComponent implements OnInit, OnDestroy {

    payment_success = false;
    billing_success = false;
    contents: any;
    bannerImage: any;

    constructor(
        private cartService: CartService,
        private contentService: ContentResoveService
    ) { }

    ngOnInit() {
        this.contents = this.contentService.contents ? this.contentService.contents : [];
        this.getBannerImage();
    }

    ngOnDestroy() {
        this.removeFromLocalStorage();
        this.cartService.cartReload.next({ reload: true });
    }

    private removeFromLocalStorage() {
        if (localStorage.getItem('confirmOrder')) {
            const names = ['billingInfo', 'user_cart', 'token', 'confirmOrder', 'shippingAddress', 'deliveryCharge', 'pickup'];
            names.forEach(f => {
                localStorage.removeItem(f);
            });
        }
    }

    confirmBilling() {
        this.billing_success = true;
        this.payment_success = false;
    }

    confirmPayment() {
        this.payment_success = true;
    }

    getBannerImage() {
        if (this.contents.cartBanner) {
            this.bannerImage = bannerImage(this.contents.cartBanner);
        }
    }
}
