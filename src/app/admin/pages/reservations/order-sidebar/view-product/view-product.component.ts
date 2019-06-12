import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EndPoint, product_image } from '../../../../../globals/endPoint/config';
import { OrderService } from '../../order.service/order.service';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { Subscription, Observable } from 'rxjs';
import { Item } from '../../models/order-models';
import { GET_USER, convertTime12to24, formatProductSearch, GETTIME, formateRentType } from '../../../../../globals/_classes/functions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { Helpers } from '../../../../../helpers';
import { map, retry, catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

declare let $:any;

interface Price {
  base: {};
  rent: any[];
}

class RentStart {
  date: string;
  time: string;
}

class Variant {
  variants:Attr[] = [];
  variants_products_id: number;
}

class Attr {
  attr_set_id: number;
  attr_set: string;
  attr: string;
}


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnDestroy {

  url:string = EndPoint + 'products/search';
  imageUrl = product_image;
  add_item: boolean;
  loader_sub: boolean;
  loader: boolean;
  path: string;
  sub: Subscription[] = [];
  order_id: number;
  product = null;
  productPrice: Price;
  mode: number = 1;
  base: boolean;
  item: Item;
  rentalStart: RentStart = new RentStart();
  rentPriceId = 0; 
  productList;
  available: number;
  variants: Variant = new Variant();
  locationList = [];
  edit: boolean;


  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertS: AlertService,
    private modalService: NgbModal,
    private orderS: OrderService,
    private location: Location
  ) {
    this.productList = activeRoute.snapshot.data['item'].data;
    this.getTerminal();
  }

  ngOnInit() {
    this.sub[0] = this.activeRoute.queryParamMap.subscribe(
      val => {
        const param = val.get('param');
        if(param) {
          const p = this.location.path().split('?');
          this.location.replaceState(p[0]);
          const pro = this.productList.order_items.find( f => f.variants_products_id === parseInt(param));
          if(pro) {
            this.editCart(pro);
          }
        }
      }
    );

    $('.native-routing-container').scrollTop(0, 0);
    this.path = this.activeRoute.snapshot['_routerState'].url;
    this.order_id = parseInt(this.orderS.getOrderId(this.activeRoute));
  }

  ngOnDestroy() {
    if (this.path.includes('details')) {
      this.orderS.update({data: this.productList, from: 'ITEMS', update: true});
    } else {
      this.orderS.updateOrder({data: [], add: false});
    }
    for (let s of this.sub) {
      s.unsubscribe();
    }
  }

  getTerminal() {
    this.orderS.getterminals().subscribe(
      res => {
        if(res.status == 'OK' && res.result.data) {
          this.locationList = res.result.data;
        } else {
          this.locationList = [];
        }
      },
      err => {
        console.log(err);
        this.locationList = [];
      }
    );
  }


  /* ************** Autocomplete *********** */

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.loader_sub = true;
        return this.getProductList(term);
      }),
      tap(() => this.loader_sub = false),
    );
  }

  private getProductList(params): any {
    if (!params && params === '') {
      this.loader_sub = false;
      return [];
    }
    // console.log(params);
    const search = 'search=' + params.trim();
    return this.orderS.searchProduct(search).pipe(
      map(res => {
        this.loader_sub = false;
        return formatProductSearch(res.result.data);
      }),
      retry(3),
      catchError(() => {
        this.loader_sub = false;
        return [];
      })
    );
  }

  formatter = (x: {name: string}) => x.name;

  changeValue(data){
    let r = data.item;
    this.variants = new Variant();
    this.reset();
    this.formatvariant(r);
    this.getProduct(r.variants_products_id);
  }

  formatvariant(data) {
    this.variants.variants_products_id = data.variants_products_id;
    this.variants.variants = [];
    for(let i=0; i < data.variant_chain_name.length; i++) {
      let obj: Attr = new Attr();
      obj.attr_set_id = data.variant_set_id[i];
      obj.attr_set = data.variant_set_name[data.variant_set_id[i]];
      obj.attr = data.variant_chain_name[i];
      this.variants.variants.push(obj);
    }
  }


  initProduct() {
    this.item = new Item();
    this.item.quantity = 1;
    this.item.order_id = this.order_id;
    /* New data */
    this.item.variants_products_id = this.variants.variants_products_id;
    this.item.sales_tax = this.product.sales_tax;
    this.item.product_id = this.product.id;
  }

  getProduct(a) {
    this.loader_sub = true;
    this.orderS.getProduct(a).subscribe(
      res => {
        this.loader_sub = false;
        // console.log(res);
        this.product = res.data;
        if(!this.edit) {
          this.initProduct();
        }
        this.productPrice = this.orderS.formatePrice(this.product.prices);
        this.base = Object.keys(this.productPrice.base).length > 0 ? true : false;
        this.checkBuy(this.base); 
      },
      err => {
        this.loader_sub = false;
        this.error(err, 'Something wrong! Please try again');
      }
    );
  }

  checkBuy(buy) {
    if(buy && !this.edit) {
      this.mode = 1;
      this.formateBuy();
    } else {
      this.mode = 2;
      if(this.productPrice.rent.length>0) {
        const ind = this.productPrice.rent.findIndex( f => f.price === this.item.price && f.rent_type === this.item.rental_type);
        if(ind > -1) {
          this.formateRent(this.productPrice.rent[ind], ind);
        } else {
          this.formateRent(this.productPrice.rent[0], 0);
        }
      }
    }
  }

  formateBuy() {
    this.item.price = this.productPrice.base['price'];
    this.item.rental_duration =  this.productPrice.base['rent_duration'];
    this.item.rental_type =  this.productPrice.base['rent_type'];
    this.item.term = this.productPrice.base['duration'];
    // console.log(this.item);
  }

  formateRent(data, i) {
    const date = this.item.rent_start ? new Date(this.item.rent_start) : new Date();
    setTimeout(() => this._datePicker(date),100);
    this.rentPriceId = i;
    this.item.price = data['price'];
    this.item.rental_duration = this.item.rental_duration ? this.item.rental_duration : data['rent_duration'];
    this.item.rental_type =  data['rent_type'];
    this.item.term = data['duration'];
    // console.log(this.item);
    const rentTime = this.orderS.getCurrentDateTime(date);
    this.rentalStart.date = rentTime['date'];
    this.rentalStart.time = rentTime['time'];
  }

  decreaseQuant() {
    if (this.item.quantity > 0) {
      this.item.quantity--;
    }
  }

  increaseQuant() {
    this.item.quantity++;
  }

  addItem() {
    this.loader = true;
    this.item.location = this.item.location ? this.item.location : GET_USER().location_id;
    if (!this.item.rental_type) {
      this.formatSendData();
    } else {
      this.formatSendData(this.rentalStart, this.product.deposit_amount, this.product.deposite_tax);
    }
    this.orderS.addItem(this.item, this.edit).then(
      res => {
        this.loader = false;
        if(res.result.data.success) {
          this.alertS.success(this.alertContainer, 'Product has been added', true, 5000);
          this.productList = res.result.data.order;
          this.reset();
        }
        
      }
    ).catch(
      err => this.error(err, 'Something wrong! Product has not been added')
    );
  }

  private formatSendData(date?, dAmount?, dTax?) {
    this.item.rent_start = date ? this.orderS.formateDate(date) : null;
    this.item.deposit_amount = dAmount ? dAmount : 0;
    this.item.deposite_tax = dTax ? dTax : false;
  }

  reset() {
    this.product = null;
    this.edit = null;
    this.item = new Item();
  }

  decreaseRent() {
    if(this.item.rental_duration > 1) {
      this.item.rental_duration--;
    }
  }

  increaseRent() {
    if(this.item.rental_duration < 5) {
      this.item.rental_duration++;
    }
  }

  private _datePicker(d: Date) {
    $('#Rental-time').timepicker({  
      defaultTime: GETTIME(d),       
      minuteStep: 1,
      showSeconds: false,
      showMeridian: true,
      snapToStep: true
    });
    $('#Renterl-date').datepicker({
      todayHighlight: true,
      orientation: "bottom right",
      format: 'yyyy-mm-dd',
      templates: {
          leftArrow: '<i class="la la-angle-left"></i>',
          rightArrow: '<i class="la la-angle-right"></i>'
      },
      startDate: d
    });
    $("#Renterl-date").datepicker("setDate", d); 
    this.rentalTimeChange()
  }

  rentalDateChange(){
    $('#Renterl-date').datepicker().on('changeDate',(e)=>{
      let date = e.date;
      this.rentalStart['date'] = this.orderS.getCurrentDateTime(date)['date'];
    });
  }


  rentalTimeChange(){
    $('#Rental-time').on('change', () => {
      let time = $('#Rental-time').data('timepicker').getTime();
      this.rentalStart['time'] = convertTime12to24(time); 
      // console.log(this.rentalStart['time'], this.item);
    });
  }

  error(err, message) {
    this.loader = false;
    this.loader_sub = false;
    Helpers.setLoading(false);
    this.alertS.error(this.alertContainer, message, true, 5000);
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

  editCart(cart) {
    this.reset();
    this.item = new Item();
    this.edit = true;
    this.item = cart;
    this.getProduct(cart.variants_products_id);
  }

  removeCart(id, i) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result) => {
      if (result) {
        Helpers.setLoading(true);
        this.archiveItem(id, i);
      }
    }, (res) => {
      console.log(res);
    });
  }

  archiveItem(id, i) {
    this.orderS.deleteItem(id).then(
      res => {
        Helpers.setLoading(false);
        this.alertS.success(this.alertContainer, 'Product has been deleted', true, 5000);
        this.productList = res.result.data;
      }
    ).catch (
      err => this.error(err, 'Something wrong! Product has not been deleted')
    );
  }

  getTotalDepositedAmount(order) {
    return this.orderS.getTotalDeposit(order);
  }

  get checkStatus() {
    const sta = [1, 2, 3, 7];
    return sta.includes(this.productList.status);
  }

}

