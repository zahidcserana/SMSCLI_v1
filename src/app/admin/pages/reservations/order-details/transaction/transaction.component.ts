import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../order.service/order.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpInspectorService } from '../../../../../modules/http-with-injector/http-inspector.service';
import { isJson } from '../../../../../globals/_classes/functions';

@Component({
  selector: 'order-details-delivery',
  templateUrl: './transaction.component.html',
  styleUrls: ['../order-details.component.css']
})
export class TransactionComponent implements OnInit, OnDestroy {

  transactions = [];
  order_id;
  sub: Subscription[] = [];


  constructor(
    private activeRoute: ActivatedRoute,
    private orderS: OrderService
  ) {
    this.sub[0] = this.activeRoute.parent.params.subscribe(
      val => {
        this.order_id = val['order_id'];
        this.getTransaction();
      }
    );
    this.updateList();
   }

  ngOnInit() {}

  ngOnDestroy() {
    for(let s of this.sub) {
      s.unsubscribe();
    }
  }
  
  updateList() {
    this.sub[1] = this.orderS.updateData.subscribe(
      val => {
        if (val.update && val.from == 'PAYMENT') {
          this.getTransaction();
        }
      }
    );
  }

  getTransactionAmount(text) {
    if(text && isJson(text)) {
      const data = JSON.parse(text);
      return data.amount;
    }
    return 0;
  }

  getTransaction() {
    this.orderS.getTransaction(this.order_id).subscribe(
      res => {
        this.transactions = res.data;
        // console.log(this.transactions);
      }
    );
  }

  getDate(d) {
    if(d) {
      return new Date(d);
    }
  }

}
