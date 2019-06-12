import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { InventoryService } from '../inventory-serveice/inventory.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { Helpers } from '../../../../helpers';
import { HttpInspectorService } from '../../../../modules/http-with-injector/http-inspector.service';
import { SidebarService } from '../../sidebar-service/sidebar.service';

@Component({
  selector: 'app-product-reservation',
  templateUrl: './product-reservation.component.html',
  styleUrls: ['./product-reservation.component.css']
})
export class ProductReservationComponent implements OnInit, AfterViewInit {

  reservations = [];
  pagi: Pagi = new Pagi();
  sideBaropen: boolean;
  index;
  loader: boolean;
  statusArray = [];

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBaropen) {
      this.openSidebar();
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private sidebarS: SidebarService,
    private alertS: AlertService,
    private inventoryS: InventoryService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getReservationList(1, 10);
    this.getStatusData();
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.closeSidebar();
    this.executeAction();
  }

  trackTransaction(index, tran) {
    return tran ? tran.id : null;
  }

  closeSidebar() {
    $('.close-sidebar').click((e) => {
      e.preventDefault();
      this.executeAction();
    });
  }

  executeAction() {
    this.sideBaropen = null;
    this.sidebarS.removeSidebar();
    $('.native-routing').css('display', 'none');
  }

  openSidebar() {
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
    this.sideBaropen = true;
  }

  getDate(d) {
    if(d) {
        return new Date(d);
    }
    return '';
  }

  reloadTable(e) {
    this.getReservationList(e.page, e.limit);
  }

  getReservationList (p?, l?) {
    this.inventoryS.getReservationList(p, l).subscribe(
      res => {
        // console.log(res);
        this.dataList(res);
      },
      err => console.log(err)
    );
  }

  private dataList(res) {
    this.reservations = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page_no']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 10;
  }

  deleteReservation(id) {
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      size:'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result)=>{
      if(result){
        // console.log(result);
        Helpers.setLoading(true);
        this.archiveProduct(id);
      }
    });
  }

  archiveProduct(id){
    this.inventoryS.deleteReservation(id)
    .then(
      res=>{
          // console.log(res);
          this.reloadTable({page:this.pagi.page, limit:this.pagi.limit});
          this.alertS.success(this.alertContainer, 'Reservation has been deleted', true, 5000); 
          Helpers.setLoading(false);
      })
    .catch(
      err => this.error(err, 'Something wrong! Reservation has been not deleted')
    );
  }

  error(err, message) {
    console.log(err);
    Helpers.setLoading(false);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

  createOrder(list, i) {
    const availability = {
      id: list.id,
      product_id: list.product.id,
      start_date: list.start_date,
      end_date: list.end_date,
      order_id: null,
      quantity: list.quantity
    }
    this.index = i;
    this.openSidebar();
    this.inventoryS.reserveReload({pro_id: list.product.id, ava: availability})
  }

  submitOrder(e) {
    // console.log(e);
    if(e.sub) {
      if(e.success) {
        this.reloadTable({page:this.pagi.page, limit:this.pagi.limit});
        this.alertS.success(this.alertContainer, 'Order has been created', true, 5000);
        this.executeAction();
      } else {
        this.alertS.error(this.alertContainer, `Sorry, only ${e.data  < 1 ? 0 : e.data} item(s) are available`, true, 5000);
      }
    } else {
      // console.log(e.data);
      this.alertS.error(this.alertContainer, 'Something wrong!! Order has been not created', true, 5000);
    }
  }

  details(id) {
    this.router.navigate(['admin/reservations/' + id + '/details']);
  }

  getStatusData() {
    this.inventoryS.getOrderStatus().subscribe(
      res => {
        this.statusArray = Object.values(res);
        // console.log(this.statusArray);
      },
      err => console.log(err)
    );
  }

  getStatus(s) {
    return this.statusArray[parseInt(s)-1];
  }

  checkStatus(s) {
    switch (s) {
        case 1:
            return 'm-badge--info';
        case 2:
            return 'm-badge--warning';
        case 3:
            return 'm-badge--primary';
        case 4:
            return 'm-badge--success';
        case 5:
            return 'm-badge--success';
        case 6:
            return 'm-badge--brand';
        case 7:
            return 'm-badge--danger';
        default:
            return 'm-badge--info';
    }
  }


}
