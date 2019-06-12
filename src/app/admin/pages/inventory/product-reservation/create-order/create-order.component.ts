import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ReserveDate } from '../../product-sidebar/product_models';
import { OrderItem, OrderCustomer } from '../../product-models/inventory.models';
import { InventoryService } from '../../inventory-serveice/inventory.service';
import { Subscription } from 'rxjs';
import { GET_USER } from '../../../../../globals/_classes/functions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { product_image } from '../../../../../globals/endPoint/config';

declare let $:any;

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  loader: boolean;
  loaderLoad: boolean;
  item: OrderItem = new OrderItem();
  productPrice = {rent: []};
  attributes = [];
  product = null;
  customer: OrderCustomer = new OrderCustomer();
  rentPriceId = 0;
  setReserve: ReserveDate = new ReserveDate();
  sub: Subscription;
  totalQuant;
  available = 0;
  imageUrl = product_image;

  @Output('submitOrder') submitOrder: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private inventoryS: InventoryService
  ) { }

  ngOnInit() {
    this.sub = this.inventoryS.reserve.subscribe(
      val => {
        if(val) {
          this.loaderLoad = true;
          // console.log(val);
          this.getProduct(val.pro_id);
          this.setReserve = val.ava;
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getProduct(id) {
    this.inventoryS.getProduct(id).subscribe(
      res => {
        this.product = res.data;
        this.loaderLoad = false;
        this.totalQuant = this.product.quantity;
        // console.log(this.product);
        setTimeout(() => {
          this.initProduct();
          this.datePicker();
        }, 500);
        
      }
    );
  }

  initProduct() {
    this.item = new OrderItem();
    this.item.user_id = GET_USER().user_id;
    this.productPrice = this.inventoryS.formatePrice(this.product.prices);
    this.attributes = this.inventoryS.formateAttribute(this.product.attribute_sets);
    this.item.store_id = this.product.store_id;
    this.item.sales_tax = this.product.sales_tax;
    this.item.product_id = this.product.id;
    let rentIndex = this.inventoryS.calculateEndFromArray(this.productPrice.rent);
    this.formateRent(this.productPrice.rent[rentIndex], rentIndex);
  }

  formateRent(data, i) {
    this.rentPriceId = i;
    this.item.price = data['price'];
    this.item.rental_duration =  data['rent_duration'];
    this.item.rental_type =  data['rent_type'];
    this.item.term = data['duration'];
    // console.log(this.item);
    this.formatEndDateAvail();
    
  }

  formatEndDateAvail() {
    if(this.item.rental_type == 'hourly') {
      this.setReserve.end_date = this.inventoryS.calculateEndDate(this.setReserve.start_date, 1);
      this.available = this.inventoryS.getAvailableQty(this.product.products_availabilities, this.totalQuant, this.setReserve.start_date, 1);
    } else if(this.item.rental_type == 'weekly') {
      this.setReserve.end_date = this.inventoryS.calculateEndDate(this.setReserve.start_date, this.item.term * 7);
      this.available = this.inventoryS.getAvailableQty(this.product.products_availabilities, this.totalQuant, this.setReserve.start_date, this.item.term * 7);
    } else {
      this.setReserve.end_date = this.inventoryS.calculateEndDate(this.setReserve.start_date, this.item.term);
      this.available = this.inventoryS.getAvailableQty(this.product.products_availabilities, this.totalQuant, this.setReserve.start_date, this.item.term);
    }
    $('#purchase-date-end').datepicker('update', this.setReserve.end_date);
  }

  decreaseItemQuant() {
    if (this.setReserve.quantity > 0) {
      this.setReserve.quantity--;
    }
  }

  increaseItemQuant() {
    if (this.setReserve.quantity < this.available) {
      this.setReserve.quantity++;
    }
  }

  private datePicker() {
    this.inventoryS.datePicker();
    $('#purchase-date-start').datepicker('update', new Date(this.setReserve.start_date));
    let date = new Date(this.setReserve.start_date);
    this.setReserve.start_date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    this.formatEndDateAvail();
    this.available = this.available + this.setReserve.quantity;
  }

  startDateChange() {
    $('#purchase-date-start').datepicker().on('changeDate',(e)=>{
      let date = e.date;
      this.setReserve.start_date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      this.formatEndDateAvail();
    })
  }

  formatDates() {
    let dateStart = new Date(this.setReserve.start_date);
    this.setReserve.start_date = dateStart.getFullYear()+'-'+(dateStart.getMonth()+1)+'-'+dateStart.getDate();
    let dateEnd = new Date(this.setReserve.end_date);
    this.setReserve.end_date = dateEnd.getFullYear()+'-'+(dateEnd.getMonth()+1)+'-'+dateEnd.getDate();
  }

  addOrder() {
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true
    });
    modalRef.componentInstance.massage = 'After creating new order product quantity will be reduced. Do you want to create new order?';
    modalRef.result
    .then((result)=>{
      if(result){
        // console.log(result);
        this.addItem();
      }
    }).catch(
      cancel => console.log('')
    );
  }

  addItem() {
    this.formatDates();
    this.loader = true;
    this.item.attributes = this.attributes.length > 0 ? this.attributes.join(',') : null;
    this.item.rent_start = this.setReserve.start_date;
    this.item.rent_end = this.setReserve.end_date;
    this.item.quantity = this.setReserve.quantity;
    this.item.deposit_amount = this.product.deposit_amount;
    this.item.deposite_tax = this.product.deposite_tax;
    this.setReserve.order_id = null;
    this.customer.status = 7;
    const data = {
      item: this.item,
      availability: this.setReserve,
      customer: this.customer
    }
    // console.log(data);
    this.inventoryS.createOrder(data).then(
      res => {
        this.loader = false;
        if(res.result.data.success) {
          this.submitOrder.emit({sub: true, success: res.result.data.success});
        } else {
          this.totalQuant = res.result.data.quantity;
          this.available = this.inventoryS.getAvailableQty(this.product.products_availabilities, this.totalQuant, this.setReserve.start_date, this.item.term);
          this.available = this.available + this.setReserve.quantity;
          this.submitOrder.emit({sub: true, success: res.result.data.success, data: this.available});
        }
        // console.log(res.result.data);
        
      }
    ).catch(
      err => this.submitOrder.emit({sub: false})
    );
  }


}
