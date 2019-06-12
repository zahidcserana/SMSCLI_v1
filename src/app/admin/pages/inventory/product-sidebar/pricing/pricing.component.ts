import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { InventoryService } from '../../inventory-serveice/inventory.service';
import { ProductPrice, ProductPricInfo, AttributeList, AttributManage } from '../product_models';
import { HttpInspectorService } from '../../../../../modules/http-with-injector/http-inspector.service';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { Helpers } from '../../../../../helpers';
import { Subscription } from 'rxjs';
import { singleOrNot } from '../../../../../globals/_classes/functions';


declare let $:any;


@Component({
  selector: 'product-sidebar-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit, AfterViewInit, OnDestroy {

  pro_id: number;
  priceList: ProductPrice[] = [];
  price: ProductPrice = new ProductPrice();
  priceInfo: ProductPricInfo;
  selected_value: any;
  index: number;
  edit: boolean;
  loader: boolean;
  loaderInfo: boolean;
  onePrice: boolean = false;
  selected = '0';
  editInfo: boolean;
  sub: Subscription;
  priceForm: boolean;
  selectedId = {
    variants_products_id: 0,
    product_id: 0
  };
  attributeList: AttributManage[] = [];
  noData: boolean;
  listLoader: boolean;
  applyAll: boolean;


  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private alertS: AlertService,
    private inventoryS: InventoryService,
    private activeRoute: ActivatedRoute
  ) {
      this.sub =  this.activeRoute.data.subscribe(
        val => {
          this.pro_id = this.inventoryS.getProId(this.activeRoute);
          const attList = val['list'].result.data;
          if(attList && attList.length > 0) {
            this.noData = null;
            this.getAttribute(attList);
          } else {
            this.noData = true;
          }
        }
      );
   }

  ngOnInit() {
    $('.native-routing-container').scrollTop(0, 0);
    this.initAddPriceInfo();
  }

  ngAfterViewInit() {this.datePicker();}

  ngOnDestroy() {
    const url: string = this.activeRoute.snapshot['_routerState'].url;
    if (url.includes('details/edit')) {
      this.inventoryS.reload({reload: true, id: this.pro_id, from: 'PRICE', data: {selectedId: this.selectedId, price: this.priceList}});
    }
    this.sub.unsubscribe();
  }

  single(v) {
    return singleOrNot(v)
  }

  get unassign() {
    return this.attributeList.map( m => m['set_id']).includes(1);
  }

  getAttribute(attList) {
    this.attributeList = attList.map((m) => {
      m['id'] = m.ids[m.ids.length - 1];
      m['chain'] = m.variant_set.map((a) => a.variant_set_name + '(' + a.name + ')').join(', ');
      m['set_id'] = m.variant_set.length > 0 ? m.variant_set[0].variant_set_id : null;
      return m;
    });

    if(this.attributeList.length > 0) {
      let attr =  this.attributeList.find( f => {
        return f.default;
      });
      this.selectedId.variants_products_id = attr ? attr.id : this.attributeList[0].id;
      this.selectedId.product_id = this.pro_id;
    }
    this.listLoader = true;
    this.getPriceInfo();
    this.priceForm = false;
    this.getPriceList();
  }

  attributeChange() {
    this.listLoader = true;
    this.selectedId.product_id = this.pro_id;
    this.applyAll = false;
    this.getPriceInfo();
    this.priceForm = false;
    this.getPriceList();
  }

  getPriceInfo() {
    this.inventoryS.getPriceInfo(this.pro_id, this.selectedId.variants_products_id).subscribe(
      res => {
        this.listLoader = false;
        if(res.data.product) {
         this.formatPriceInfo(res.data);
         this.formatDate(this.priceInfo.purchase_date);
        }
      },
      err => {this.listLoader = false;console.log(err);this.priceInfo = new ProductPricInfo();}
    );
  }

  formatPriceInfo(data) {
    this.priceInfo = new ProductPricInfo();
    this.priceInfo.cost = data.variant.cost;
    this.priceInfo.deposit_amount = data.product.deposit_amount;
    this.priceInfo.deposit_tax = data.deposit_tax ? (data.deposit_tax.value == 'true' ? true : false) : false;
    this.priceInfo.purchase_date = data.variant.purchase_date;
    this.priceInfo.sales_tax = data.product.sales_tax;
    this.priceInfo.ldw_tax = data.product.ldw_tax;
  }

  getPriceList() {
    this.inventoryS.getPriceList(this.pro_id, this.selectedId.variants_products_id).subscribe(
      res => {
        this.listLoader = false;
        if(res.data) {
          this.priceList = res.data;
        } else {
          this.priceList = [];
        }
      },
      err => {this.listLoader = false;console.log(err);this.priceList = [];}
    );
  }


  initAddPrice() {
    this.price = new ProductPrice ();
    this.edit = false;
    this.onePrice = false;
    this.priceForm = true;
  }

  initAddPriceInfo() {
    this.editInfo = false;
    this.priceInfo = new ProductPricInfo ();
    this.formatDate();
  }

  initAddOnePrice() {
    this.initAddPrice();
    this.onePrice = true;
  }

  private datePicker() {
    $('#purchase-date').datepicker({
      todayHighlight: true,
      orientation: "bottom left",
      format: 'yyyy-mm-dd',
      templates: {
          leftArrow: '<i class="la la-angle-left"></i>',
          rightArrow: '<i class="la la-angle-right"></i>'
      }
    });
    this.formatDate();
  }

  dateChange() {
    $('#purchase-date').datepicker().on('changeDate',(e)=>{
      this.formatDate(e.date);
    })
  }

  formatDate(d?) {
    const date = d ? new Date(d) : new Date(); 
    $('#purchase-date').datepicker('update', date);
    this.priceInfo.purchase_date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  }

  resetForm() {
    this.priceForm = false;
  }

  trackPrice(index, elem) {
    return elem ? elem.id : null;
  }

  savePrice(f) {
    this.loader = true;
    if(this.applyAll) {
      this.price['all'] = this.attributeList
        .filter( f => f.id != this.selectedId.variants_products_id)
        .map( m => m.id);
    }
    this.inventoryS.addProductPrice(this.pro_id, this.selectedId.variants_products_id, this.price)
    .then(
      res => {
        this.loader = false;
        if(res.status == 'OK' && res.result.data.length > 0) {
          this.priceList = res.result.data;
          this.alertS.success(this.alertContainer, 'Price has been successfully added', true, 5000);
          f.form.reset();
          this.priceForm = false;
          this.applyAll = false;
        } else {
          this.error('', 'Something wrong! Price has been not added');
        }
      }
    ).catch(
      err => this.error(err, 'Something wrong! Price has been not added')
    )
  }

  addPriceInfo(f) {
    this.loaderInfo = true;
    if(this.applyAll) {
      this.priceInfo['all'] = this.attributeList
        .filter( f => f.id != this.selectedId.variants_products_id)
        .map( m => m.id);
    }
    this.inventoryS.addProductPriceInfo(this.pro_id, this.selectedId.variants_products_id, this.priceInfo)
    .then(
      res => {
        this.loaderInfo = false;
        if(res.result.data.product) {
          this.formatPriceInfo(res.result.data);
          this.formatDate(this.priceInfo.purchase_date);
          this.applyAll = false;
        }
        this.alertS.success(this.alertContainer, 'Price information has been successfully added', true, 5000);
      }
    ).catch(
      err => this.error(err, 'Something wrong! Price information has been not added')
    )
  }


  editPrice(price, i) {
    this.edit = true;
    this.priceForm = true;
    this.price = Object.assign({}, price);
    this.index = i;
    this.onePrice = this.checkRental(i, this.price.price, this.price.hourly_price, this.price.daily_price, this.price.weekly_price);
    if(this.onePrice) {
      this.selected = this.checkPrice(this.price.hourly_price, this.price.daily_price, this.price.weekly_price);
    } 
    $('#purchase-date').datepicker('update', new Date(price.purchase_date));
  }

  updatePrice(f) {
    this.loader = true;
    if(this.applyAll) {
      this.price['all'] = this.attributeList
        .filter( f => f.id != this.selectedId.variants_products_id)
        .map( m => m.id);
    }
    this.inventoryS.updateProductPrice(this.selectedId.variants_products_id, this.price)
    .then(
      res => {
        this.loader = false;
        if(res.status == 'OK' && res.result.data.length > 0) {
          this.priceList = res.result.data;
          this.alertS.success(this.alertContainer, 'Price has been successfully updated', true, 5000);
          f.form.reset();
          this.priceForm = false;
          this.applyAll = false;
        } else {
          this.error('', 'Something wrong! Price has been not updated');
        } 
      }
    ).catch(
      err => this.error(err, 'Something wrong! Price has been not updated')
    )
  }

  deletePrice(id, i) {
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      size:'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result)=>{
      if(result){
        Helpers.setLoading(true);
        this.archiveProduct(id, i);
      }
    });
  }

  archiveProduct(id, index){
    this.inventoryS.deleteProductPrice(id)
    .then(
      res=>{
          this.alertS.success(this.alertContainer, 'Price has been deleted', true, 5000); 
          this.priceList.splice(index, 1);
          Helpers.setLoading(false);
          this.priceForm = false;
      })
    .catch(
      err => this.error(err, 'Something wrong! Price has been not deleted')
    );
  }

  error(err, message) {
    console.log(err);
    Helpers.setLoading(false);
    this.loader = false;
    this.loaderInfo = false;
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

  checkRental(index, base, ...data) {
    const c = data.filter((p) => {
      return p && p != 0;
    }).length;

    if(base == 0 && index !== 0 && c < 2) {
      return true;
    }

    return false;
  }

  checkPrice(h, d, w) {
    switch (true) {
      case h > 0:
        return '1'
      case d > 0:
        return '2'
      case w > 0:
        return '3'
    }
  }

  

}
