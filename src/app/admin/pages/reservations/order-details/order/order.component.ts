import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../order.service/order.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusDialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { Helpers } from '../../../../../helpers';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { Order } from '../../models/order-models';

@Component({
  selector: 'order-details-order',
  templateUrl: './order.component.html',
  styleUrls: ['../order-details.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  order: Order = new Order();
  sub: Subscription[] = [];
  order_id: number;
  statusArray: string[] = [];

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private orderS: OrderService,
    private alertS: AlertService
  ) { 
    this.sub[0] = this.activeRoute.parent.params.subscribe(
      val => {
        this.order_id = val['order_id'];
        this.getOrderList();
      }
    );
  }

  ngOnInit() {
    this.updateList();
    this.getStatusData();
  }

  ngOnDestroy() {
    for(let s of this.sub) {
      s.unsubscribe();
    }
  }

  getStatusData() {
    this.orderS.getOrderStatus().subscribe(
      res => {
        this.statusArray = Object.values(res);
        // console.log(this.statusArray);
      },
      err => console.log(err)
    );
  }

  getOrderList() {
    this.orderS.getOrderDetails(this.order_id).subscribe(
      res => {
        this.order = res.data;
        // console.log(this.order);
      },
      err => console.log(err)
    );
  }

  updateList() {
    this.sub[1] = this.orderS.updateData.subscribe(
      val => {
        if (val.update && (val.from == 'ITEMS' || val.from == 'PAYMENT')) {
          this.getOrderList();
        }
      }
    );
  }

  getDateFormate(date) {
    return this.orderS.getDate(date);
  }

  getStatus(s) {
    return this.orderS.getStatus(s, this.statusArray);
  }

  checkStatus(s) {
    return this.orderS.checkStatus(s);
  }

  changeStatus(order) {
    // console.log(order.status);
    const modalStatus = this.modalService.open(StatusDialogBoxComponent, {
      centered: true
    });
    modalStatus.componentInstance.orderStatus = order.status;
    modalStatus.componentInstance.status = this.statusArray;
    modalStatus.result
    .then((result) => {
      if (result) {
        Helpers.setLoading(true);
        this.statusChange(order, result);
      }
    }, (res) => {
      console.log(res);
    });
  }

  statusChange(order, id) {
    this.orderS.changeStatus(order.id, id).then(
      res => {
        order.status = parseInt(id);
        Helpers.setLoading(false);
        this.alertS.success(this.alertContainer, `Status of ${order.id} has been changed`, true, 5000);
      }
    ).catch (
      err => {
        console.log(err);
        Helpers.setLoading(false);
        this.alertS.error(this.alertContainer, `Something wrong! Status of ${order.id} has been not changed`, true, 5000);
      }
    );
  }

}
