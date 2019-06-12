import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../type.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  sub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.parent.data.subscribe(
      val => {
        const data = val ? val['product_details'] : null;
        this.products = data && data.related_products ? data.related_products : [];
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
