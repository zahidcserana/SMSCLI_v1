import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../type.model';
import { CartService } from '../../home-service/cart.service';
import { AlertService } from '../../../modules/alert/alert.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() allProduct: Product[] = [];
  products: Product[] = [];
  @ViewChild('hasCusAlert') alertContainer: ElementRef;
  constructor(
    private aler: AlertService,
    private servie: CartService) {
    this.servie.cartAlert.subscribe(res => {
      if (res.reload) {
        this.aler.success(this.alertContainer, 'Product has been added to cart', true, 5000);
      } else {
        res.message ? this.aler.error(this.alertContainer, res.message, true, 5000) : '';
      }
    });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    this.products = this.allProduct;
  }
}
