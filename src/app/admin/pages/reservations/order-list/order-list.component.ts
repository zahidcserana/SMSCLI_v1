import { Component, OnInit, AfterViewInit, HostListener, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { OrderService } from '../order.service/order.service';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { Subscription } from 'rxjs';
import { SORTING, calculatePage, FORMATESORT, GET_USER } from '../../../../globals/_classes/functions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Helpers } from '../../../../helpers';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { AlertService } from '../../../../modules/alert/alert.service';
import { StatusDialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Order } from '../models/order-models';
import { EndPoint } from '../../../../globals/endPoint/config';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, AfterViewInit, OnDestroy {

  sidebarOpen: boolean = false;
  pagi: Pagi = new Pagi();
  filter: string = '';
  loader: boolean;
  orderList: Order[] = [];
  sub: Subscription[] = [];
  sort = {};
  status = null;
  routeStatus = '';
  staustId = null;
  currentPath: string;
  statusArray: string[] = [];
  url = EndPoint;
  rentalOrders;


  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sidebarOpen) this.sidebarS.openSidebar();
  }

  constructor(
    private sidebarS: SidebarService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private orderS: OrderService,
    private alertS: AlertService
  ) {
    this.checkRoute();
    this.addUpdateOrder();
    this.getOrderListFromRoute();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getStatusData();
  }

  ngAfterViewInit() {
    this.closeEdit();
  }

  ngOnDestroy() {
    for (let s of this.sub) {
      s.unsubscribe();
    }
  }

  private checkRoute() {
    this.sub[0] = this.router.events.pipe(map(() => {
      const orderEdit = this.router.createUrlTree(['edit-order'], { relativeTo: this.route });
      return this.router.isActive(orderEdit, false);
    })).subscribe(active => {
      if (active) {
        this.sidebarS.openSidebar();
      } else {
        this.sidebarS.removeSidebar();
      }
      this.sidebarOpen = active;
    });
  }

  addUpdateOrder() {
    this.sub[1] = this.orderS.addUpdateOrder.subscribe(
      val => {
        // console.log(val);
        if (val) {
          // console.log(val);
          if (val.add) {
            if (this.pagi.page == 1) {
              const size = this.orderList.length;
              if (size === 10) {
                this.orderList.splice(9, 1);
                this.orderList.splice(0, 0, val.data);
              } else {
                this.orderList.splice(0, 0, val.data);
              }
            } else {
              this.dataRender(this.pagi.page, this.pagi.limit, '');
            }
          } else {
            this.dataRender(this.pagi.page, this.pagi.limit, '');
          }
        }
      }
    );
  }

  getOrderListFromRoute() {
    this.sub[2] = this.route.data.subscribe(
      val => {
        // console.log(val);
        this.dataList(val['order']);
        const path = this.route.snapshot['_routerState'].url;
        if (path.includes('rental-orders')) {
          this.rentalOrders = 1;
        } else {
          this.rentalOrders = 0;
        }
      }
    );
    this.sub[3] = this.route.params.subscribe(
      val => {
        // console.log(val);
        if (Object.keys(val).length > 0) {
          this.currentPath = val.status;
          this.staustId = this.orderS.getStatusId(val.status);
          this.routeStatus = this.staustId ? '&status=' + this.staustId : '';
          // console.log(this.staustId, this.routeStatus);
        }
      }
    );
  }

  trackOrder(index, order) {
    return order ? order.id : null;
  }

  reloadTable(e) {
    const query = FORMATESORT(this.sort);
    this.getOrderList(e.page, e.limit, this.filter, query);
  }

  getOrderList(p, l, f, s?) {
    this.loader = true;
    this.dataRender(p, l, f, s);
  }

  private dataRender(p?, l?, f?, s?) {
    this.orderS.getOrderList(p, l, this.rentalOrders, this.routeStatus, f, s).subscribe(
      res => {
        // console.log(res);
        this.dataList(res);
        this.loader = false;
      },
      err => console.log(err)
    );
  }

  private dataList(res) {
    this.orderList = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page_no']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 20;
  }

  filterList(e) {
    this.filter = e;
    this.sort = SORTING(null, {});
    this.getOrderList(1, 20, this.filter);
  }

  openSidebar(a) {
    this.sidebarS.openSidebar();
    this.router.navigate([a], { relativeTo: this.route });
  }

  openCartSidebar() {
    const store = GET_USER().location_id;
    if (store) {
      this.sidebarS.sidebarOpenChange(true);
      this.sidebarS.openCartSidebar();
    } else {
      this.alertS.info(this.alertContainer, "Store has not been selected. Please select store.", true, 5000);
    }
  }

  gotoDetails(order_id) {
    sessionStorage.setItem('lastUrl', (this.currentPath ? this.currentPath : 'rental-orders'));
    this.router.navigate(['/admin/reservations/' + order_id + '/details']);
  }


  private closeEdit() {
    $('.close-sidebar').click((e) => {
      e.preventDefault();
      this.close();
    });
    $('.close-sidebar-upper').click((e) => {
      e.preventDefault();
      this.close();
    });
  }

  private close() {
    this.sidebarOpen = false;
    this.sidebarS.removeSidebar();
    this.router.navigate(['admin/reservations/' + (this.currentPath ? this.currentPath : 'rental-orders')]);
    // console.log(this.currentPath);
  }

  openSummary(id, icon) {
    $('#' + id).toggleClass('dis-block');
    $('#' + icon).toggleClass('fa-minus-circle');
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

  sorting(id) {
    this.sort = SORTING(id, this.sort);
    const query = FORMATESORT(this.sort);
    this.dataRender(this.pagi.page, this.pagi.limit, this.filter, query);
    // console.log(this.sort);
  }

  deleteOrder(att_id, i) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
      .then((result) => {
        if (result) {
          Helpers.setLoading(true);
          this.archiveOrderSet(att_id, i);
        }
      }, (res) => {
        console.log(res);
      });
  }

  archiveOrderSet(id, i) {
    this.orderS.deleteOrder(id).then(
      res => {
        this.loadTable();
        Helpers.setLoading(false);
        this.alertS.success(this.alertContainer, 'Order has been deleted', true, 5000);
        this.orderList.splice(i, 1);
      }
    ).catch(
      err => {
        console.log(err);
        Helpers.setLoading(false);
        this.alertS.error(this.alertContainer, 'Something wrong! Order has been not deleted', true, 5000);
      }
    );
  }

  loadTable() {
    let d = calculatePage(this.pagi.page, this.pagi.limit, this.pagi.total);
    // console.log(d);
    if (d.change) {
      const query = FORMATESORT(this.sort);
      this.dataRender(d.page, d.limit, this.filter, query);
    } else {
      this.pagi.total--;
    }
  }

  formateAddress(...address) {
    return address.filter((a) => {
      return a && a !== '';
    }).join(', ');
  }

  getStatusData() {
    this.orderS.getOrderStatus().subscribe(
      res => {
        this.statusArray = Object.values(res);
      },
      err => console.log(err)
    );
  }

  changeStatus(order) {
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
    ).catch(
      err => {
        console.log(err);
        Helpers.setLoading(false);
        this.alertS.error(this.alertContainer, `Something wrong! Status of ${order.id} has been not changed`, true, 5000);
      }
    );
  }

  checkPickUp(s) {
    let status = [4, 5, 6];
    if (status.includes(s)) return false;
    return true;
  }

  changePickup(order, ret) {
    // console.log(order);
    if (ret) {
      if(order.payment) {
        sessionStorage.setItem('lastUrl', this.currentPath);
        sessionStorage.setItem('pay', JSON.stringify(order.payment));
        this.router.navigate(['/admin/reservations/' + order.id + '/details/edit/refund']);
      }
    } else {
      const modalRef = this.modalService.open(DialogBoxComponent, {
        centered: true,
        size: 'sm'
      });
      modalRef.componentInstance.massage = 'The customer has picked up this order?';
      modalRef.result
        .then((result) => {
          if (result) {
            this.statusChange(order, 5);
          }
        }, (res) => {
          console.log(res);
        });
    }
  }


}
