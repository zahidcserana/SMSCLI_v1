import { Component, OnInit } from '@angular/core';
import { product_image, EndPoint } from '../../../globals/endPoint/config';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../home-modules/type.model';

@Component({
    selector: 'app-order-complete',
    templateUrl: './order-complete.component.html',
    styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {

    cartItems: CartItem[];
    totalSubTotal = 0;
    shippingCharge: number;
    depositAmount: number;
    img_url = product_image;
    discount: number;
    salesTax: number;
    api = EndPoint;
    order_id: number;
    deliveryTax: number;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const order = this.route.snapshot.data.orderInfo;
        if (!order.order_items) {
            this.router.navigate(['']);
        } else {
            this.cartItems = order.order_items;
            this.totalSubTotal = order.sub_total;
            this.shippingCharge = order.delivery_charge;
            this.depositAmount = order.total_deposit;
            this.discount = order.total_discount;
            this.salesTax = order.tax;
            this.deliveryTax = order.delivery_tax;
            this.order_id = order.id;
        }
    }

}