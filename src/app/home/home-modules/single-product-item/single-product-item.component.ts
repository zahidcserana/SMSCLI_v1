import { Component, OnInit, ViewChild, ElementRef, Renderer, Input } from '@angular/core';
import { getSingle_product, default_img, getOnlineStore } from '../layout.config';
import { Product } from '../type.model';
import { CartService } from '../../home-service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'single-product-item',
  templateUrl: './single-product-item.component.html',
  styleUrls: ['./single-product-item.component.css']
})
export class SingleProductItemComponent implements OnInit {
  @Input() product: Product;
  @ViewChild('singleItem') singleItem: ElementRef;
  layout: string;
  constructor(
    private router: Router,
    private cartService: CartService,
    private renderer: Renderer) { }

  ngOnInit() {
    const layout = getOnlineStore() ? getOnlineStore().store.layout : null;
    const layout_id = layout ? layout.layout_id : 0;

    this.layout = getSingle_product(this.product, layout_id);
    this.renderer.setElementProperty(this.singleItem.nativeElement, 'innerHTML', this.layout);
    const cart_btn: HTMLElement = this.singleItem.nativeElement.querySelector('.add_to_cart-btn');
    const details_btn: HTMLElement = this.singleItem.nativeElement.querySelector('.details-btn');
    const details_btn_title: HTMLElement = this.singleItem.nativeElement.querySelector('.cp-name');
    if (this.product.prices.length && this.product.prices[0].price && this.product.default_variant.quantity.quantity) {
      cart_btn.style.visibility = 'visible';
      cart_btn.addEventListener('click', this.addTocart.bind(this));
    } else {
      cart_btn.style.visibility = 'hidden';
    }
    details_btn.addEventListener('click', this.gotToDetails.bind(this));
    details_btn_title.addEventListener('click', this.gotToDetails.bind(this));
    const p_img = this.singleItem.nativeElement.querySelector('img');
    if (p_img) {
      p_img.onerror = function () {
        p_img.src = default_img;
      };
    }

  }

  addTocart() {
    this.cartService.createCart(this.product);
  }
  gotToDetails() {
    this.router.navigateByUrl(`/product/${this.product.uuid}/${this.product.url}`);
  }
}

