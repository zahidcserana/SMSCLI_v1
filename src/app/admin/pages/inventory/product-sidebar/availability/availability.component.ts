import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ReserveDate } from '../product_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { InventoryService } from '../../inventory-serveice/inventory.service';
import { Helpers } from '../../../../../helpers';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { GET_USER } from '../../../../../globals/_classes/functions';
import { OrderItem, OrderCustomer } from '../../product-models/inventory.models';
import { HttpInspectorService } from '../../../../../modules/http-with-injector/http-inspector.service';
import { product_image } from '../../../../../globals/endPoint/config';


declare let $:any;

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit,  AfterViewInit {

  edit: boolean;
  reservations: ReserveDate[] = [];
  setReserve: ReserveDate = new ReserveDate();
  available: number = 0;
  loader: boolean;
  loaderInfo: boolean;
  pro_id: number;
  totalQuant;
  item: OrderItem;
  productPrice = {rent: []};
  attributes = [];
  product = null;
  customer: OrderCustomer = new OrderCustomer();
  orderAdd: boolean;
  rentPriceId = 0;
  index;
  imageUrl = product_image;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private alertS: AlertService,
    private inventoryS: InventoryService,
    private activeRoute: ActivatedRoute
  ) {
    this.pro_id = this.inventoryS.getProId(this.activeRoute);
    this.product = this.activeRoute.snapshot.data['list'].data;
    this.initProduct();
    this.getAvailability();
  }

  ngOnInit() {
    $('.native-routing-container').scrollTop(0, 0);
    this.initAddReservation();
    this.customer['status'] = 10;
  }

  ngAfterViewInit() {
    this.datePicker();
  }

  initProduct() {
    this.item = new OrderItem();
    this.item.user_id = GET_USER().user_id;
    this.productPrice = this.inventoryS.formatePrice(this.product.prices);
    if(this.productPrice.rent && this.productPrice.rent.length > 0) {
      this.attributes = this.inventoryS.formateAttribute(this.product.attribute_sets);
      // console.log(this.productPrice, this.item.attributes);
      this.item.store_id = this.product.store_id;
      this.item.sales_tax = this.product.sales_tax;
      this.item.product_id = this.product.id;
      let rentIndex = this.inventoryS.calculateEndFromArray(this.productPrice.rent);
      this.formateRent(this.productPrice.rent[rentIndex], rentIndex);
    }
  }

  formateRent(data, i) {
    this.rentPriceId = i;
    this.item.price = data['price'];
    this.item.rental_duration =  data['rent_duration'];
    this.item.rental_type =  data['rent_type'];
    this.item.term = data['duration'];
    this.formatEndDateAvail(); 
    if(this.setReserve.start_date) {
      $('#purchase-date-end').datepicker('update', this.setReserve.end_date);
      // console.log(this.setReserve.start_date, this.setReserve.end_date);
    } 
  }

  formatEndDateAvail() {
    if(this.item.rental_type == 'hourly') {
      this.setReserve.end_date = this.inventoryS.calculateEndDate(this.setReserve.start_date, 1);
      this.available = this.inventoryS.getAvailableQty(this.reservations, this.totalQuant, this.setReserve.start_date, 1);
    } else if(this.item.rental_type == 'weekly') {
      this.setReserve.end_date = this.inventoryS.calculateEndDate(this.setReserve.start_date, this.item.term * 7);
      this.available = this.inventoryS.getAvailableQty(this.reservations, this.totalQuant, this.setReserve.start_date, this.item.term * 7);
    } else {
      this.setReserve.end_date = this.inventoryS.calculateEndDate(this.setReserve.start_date, this.item.term);
      this.available = this.inventoryS.getAvailableQty(this.reservations, this.totalQuant, this.setReserve.start_date, this.item.term);
    }
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

  private dataRender(res) {
    this.reservations = res.data;
    this.totalQuant = res.quantity;
    this.available = this.inventoryS.getAvailableQty(this.reservations, this.totalQuant, this.setReserve.start_date, this.item.term);
    if(this.edit || this.orderAdd) {
      this.available = this.available + this.setReserve.quantity;
    }
    // console.log( this.reservations)
  }

  getAvailability() {
    this.inventoryS.getAvailability(this.pro_id).subscribe(
      res => {
        // console.log(res);
        this.dataRender(res);
      }, err => console.log(err)
    );
  }

  initAddReservation() {
    this.setReserve = new ReserveDate();
    this.setReserve.quantity = 0;
    this.setReserve.product_id = this.pro_id;
    this.edit = false;
    $('#purchase-date-start').datepicker('update', new Date());
    let date = new Date();
    this.startDateCal(date);
  }

  private datePicker() {
    this.inventoryS.datePicker();
    $('#purchase-date-start').datepicker('update', new Date());
    let date = new Date();
    this.startDateCal(date);
  }

  startDateChange() {
    $('#purchase-date-start').datepicker().on('changeDate',(e)=>{
      let date = e.date;
      this.startDateCal(date);
    })
  }

  startDateCal(date) {
    this.setReserve.start_date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    this.formatEndDateAvail();
    $('#purchase-date-end').datepicker('update', this.setReserve.end_date);
  } 


  trackReservation(index, elem) {
    return elem ? elem.id : null;
  }

  getDate(d) {
    if(d) {
      return new Date(d);
    }
  }

  saveReservation() {
    this.loader = true;
    // console.log(this.setReserve);
    this.inventoryS.addReservation(this.pro_id, this.setReserve)
    .then(
      res => {
        // console.log(res);
        this.loader = false;
        if(res.result.data.success) {
          let respo = {
            data: res.result.data.reserve,
            quantity: res.result.data.quantity
          }
          this.dataRender(respo);
          this.alertS.success(this.alertContainer, 'Reservation has been successfully added', true, 5000);
        } else {
          this.notAvailable(res);
          this.alertS.error(this.alertContainer, `Sorry, only ${this.available  < 1 ? 0 : this.available} item(s) are available`, true, 5000);
        }
        this.initAddReservation();
      }
    ).catch(
      err => this.error(err, 'Something wrong! Reservation has been not added')
    )
  }

  notAvailable(res) {
    this.totalQuant = res.result.data.quantity;
    this.available = this.inventoryS.getAvailableQty(this.reservations, this.totalQuant, this.setReserve.start_date, this.item.term);
  }

  checkDate(d) {
    let date = new Date();
    return ((new Date(d).getTime()) > (new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0).getTime()));
  }

  editReserve(data) {
    this.getAvailability();
    this.setReserve = new ReserveDate();
    this.edit = true;
    this.orderAdd = false;
    this.setReserve = Object.assign({}, data);
    $('#purchase-date-start').datepicker('update', new Date(this.setReserve.start_date));
    this.formatEndDateAvail();
    $('#purchase-date-end').datepicker('update', this.setReserve.end_date);
    // console.log(this.available);
    this.available = this.available + this.setReserve.quantity;
    // console.log(this.available);
  }

  cancel() {
    this.edit = false;
    this.orderAdd = false;
    this.initProduct();
    this.initAddReservation();
  }

  formatDates() {
    let dateStart = new Date(this.setReserve.start_date);
    this.setReserve.start_date = dateStart.getFullYear()+'-'+(dateStart.getMonth()+1)+'-'+dateStart.getDate();
    let dateEnd = new Date(this.setReserve.end_date);
    this.setReserve.end_date = dateEnd.getFullYear()+'-'+(dateEnd.getMonth()+1)+'-'+dateEnd.getDate();
  }

  updateReservation() {
    this.formatDates();
    // console.log(this.setReserve);
    this.loader = true;
    this.inventoryS.updateReservation(this.setReserve)
    .then(
      res => {
        // console.log(res);
        this.loader = false;
        if(res.result.data.success) {
          let respo = {
            data: res.result.data.reserve,
            quantity: res.result.data.quantity
          }
          this.dataRender(respo);
          this.alertS.success(this.alertContainer, 'Reservation has been successfully updated', true, 5000);
          this.cancel();
        } else {
          this.notAvailable(res);
          this.available = this.available + this.setReserve.quantity;
          this.alertS.error(this.alertContainer, `Sorry, only ${this.available  < 1 ? 0 : this.available} item(s) are available`, true, 5000);
        }   
        this.initAddReservation();                
      }
    ).catch(
      err => this.error(err, 'Something wrong! Reservation has been not updated')
    )
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
    }).catch(
      cancel => console.log('')
    );
  }

  archiveProduct(id){
    this.edit = false;
    this.orderAdd = false;
    this.inventoryS.deleteReservation(id)
    .then(
      res=>{
          this.getAvailability();
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
    this.loader = false;
    this.loaderInfo = false;
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

  createOrder(data, i) {
    this.editReserve(data);
    this.orderAdd = true;
    this.edit = false;
    this.index = i;
  }

  addOrder() {
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true
    });
    modalRef.componentInstance.massage = 'Do you want to reduce product quantity during creating order? Please press "YES" to create order.';
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
          this.getAvailability();
          this.reservations[this.index] = res.result.data.reserve;
          this.cancel();
          this.alertS.success(this.alertContainer, 'Order has been Created', true, 5000);
        } else {
          this.notAvailable(res);
          this.available = this.available + this.setReserve.quantity;
          this.alertS.error(this.alertContainer, `Sorry, only ${this.available  < 1 ? 0 : this.available} item(s) are available`, true, 5000);
        }
        // console.log(res.result.data);
      }
    ).catch(
      err => this.error(err, 'Something wrong!!! Order has been not created')
    );
  }

  details(id) {
    this.router.navigate(['admin/reservations/' + id + '/details']);
  }

}
