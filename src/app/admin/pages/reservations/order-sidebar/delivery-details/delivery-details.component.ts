import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../order.service/order.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css']
})
export class DeliveryDetailsComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  path: string;
  order_id: number;
  delivery;

  constructor(
    private orderS: OrderService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub[0] = this.activeRoute.data.subscribe(
      val => {
        this.delivery = val.delivery;
      }
    );

    this.path = this.activeRoute.snapshot['_routerState'].url;
    this.order_id = parseInt(this.orderS.getOrderId(this.activeRoute));
  }

  ngOnDestroy() {
    this.sub.forEach( f => f.unsubscribe());
  }


  getTitle(d: string) {
    const arr = ['fedex', 'ups'];
    return arr.includes(d.toLowerCase());
  }

}
