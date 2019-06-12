import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../order.service/order.service';
import { ActivatedRoute } from '@angular/router';
import { product_image } from '../../../../../globals/endPoint/config';
import { formateRentType } from '../../../../../globals/_classes/functions';

@Component({
  selector: 'order-details-items',
  templateUrl: './items.component.html',
  styleUrls: ['../order-details.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {

  productList;
  sub: Subscription[] = [];
  order_id: number;
  imageUrl = product_image;

  constructor(
    private activeRoute: ActivatedRoute,
    private orderS: OrderService
  ) {
    this.sub[0] = this.activeRoute.parent.params.subscribe(
      val => {
        this.order_id = val['order_id'];
        this.getProductList();
      }
    );
  }

  ngOnInit() {
    this.updateList();
  }

  ngOnDestroy() {
    for(let s of this.sub) {
      s.unsubscribe();
    }
  }

  getProductList() {
    this.orderS.getProductList(this.order_id).subscribe(
      res => {
        this.productList = res.data;
        // console.log(this.productList);
      },
      err => console.log(err)
    );
  }

  updateList() {
    this.sub[1] = this.orderS.updateData.subscribe(
      val => {
        if (val.update && val.from == 'ITEMS') {
          // console.log(val);
          this.productList = val.data;
        }
      }
    );
  }

  getDate(d) {
    return this.orderS.formateListDate(d);
  }

  getType(d, t) {
    return d && t ? formateRentType(d, t) : '';
  }

  trackList(index, pro) {
    return pro ? pro.id : null;
  }

  calculatetax(tax, pr) {
    const t = (pr * tax) / 100;
    return t;
  }

}
