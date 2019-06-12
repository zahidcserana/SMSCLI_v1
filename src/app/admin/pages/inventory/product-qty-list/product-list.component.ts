import { Component, OnInit, ViewEncapsulation, AfterViewInit, HostListener, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { InventoryService } from '../inventory-serveice/inventory.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { CartService } from '../../../cart-service/cart.service';
import { ProdyctQty } from '../product-models/inventory.models';
import { Subscription } from 'rxjs';
import { HttpInspectorService } from '../../../../modules/http-with-injector/http-inspector.service';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { product_image } from '../../../../globals/endPoint/config';
import { GET_USER } from '../../../../globals/_classes/functions';

declare let $: any;

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit, OnDestroy {
  last_product_id: string = '';
  productLst: ProdyctQty[] = [];
  filter: string;
  sub: Subscription[] = [];
  location = [];
  pagi: Pagi = new Pagi();
  loader: boolean;
  image = product_image + GET_USER().store_id;
  saveClick = null;
  errPage: string;
  goto: number;
  start: number = 0;
  end: number = 0;
  totalPages: number = 0;


  @ViewChild('hasCusAlert') alertContainer: ElementRef;
  @ViewChild('searchPro') searchPro;

  constructor(
    private router: Router,
    private alertS: AlertService,
    private route: ActivatedRoute,
    private inventoryS: InventoryService,
    private cartS: CartService
  ) {
    this.pagi.page = 1;
    this.sub[0] = this.cartS.location.subscribe(
      val => {
        if (val) {
          this.location = val;
          this.getList(this.pagi.page, this.filter);
        }
      }
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.sub.forEach((s) => {
      s.unsubscribe();
    });
  }

  getList(p, f) {
    this.loader = true;
    this.inventoryS.getQtyListPro(p, f, this.last_product_id).subscribe(
      res => {
        window.scrollTo(0,0);
        this.loader = false;
        this.searchPro.loader = false;
        if (res.status == 'OK' && res.result.data) {
          this.last_product_id = res.result.last_product_id ? res.result.last_product_id : '';
          this.productLst = this.inventoryS.formatQtyList(res.result.data, this.location);
          this.totalPages = res.result.total ? Math.ceil(res.result.total / 100) : 0;
          this.pagi.total = res.result.total ? res.result.total : 0;
          this.goto = null;
          this.calculateDataCount();
        } else {
          this.errorList();
        }
      },
      err => {
        this.loader = false;
        this.errorList();
      }
    );
  }

  errorList() {
    if (this.errPage == 'N') {
      this.pagi.page--;
    } else if (this.errPage == 'P') {
      this.pagi.page++;
    }
    this.alertS.error(this.alertContainer, 'Something wrong!!! Please try again.', true, 5000);
    this.productLst = [];
    this.searchPro.loader = false; 
  }

  loadSearchData(e) {
    this.filter = e;
    this.last_product_id = '';
    this.pagi.page = 1;
    this.getList(this.pagi.page, this.filter);
  }

  gotoPage() {
    if (this.goto > 0 && this.goto <= this.totalPages) {
      this.pagi.page = this.goto;
      this.last_product_id = '';
      this.getList(this.pagi.page, this.filter);
    }
  }

  reloadTable(l) {
    if (l) {
      this.pagi.page++;
      this.errPage = 'N';
    } else {
      this.pagi.page--;
      this.errPage = 'P';
    }
    if (this.pagi.page > 0 && this.pagi.page <= this.totalPages) {
      this.getList(this.pagi.page, this.filter);
    }
  }

  trackPro(index, pro) {
    return pro ? pro.id : null;
  }

  trackProLoc(index, pro) {
    return pro ? pro.id : null;
  }

  saveProduct(data: ProdyctQty, i) {
    const d = data.purchase_date ? new Date(data.purchase_date) : null;
    this.saveClick = i;
    const saveData = {
      cost: data.cost,
      purchase_date: d ? (d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()) : null,
      product_id: data.product_id,
      location_data: data.location_data,
      barcode: data.barcode
    };
    this.inventoryS.saveQtyPro(saveData).then(
      res => {
        this.saveClick = null;
        if (res.status == 'OK') {
          this.alertS.success(this.alertContainer, 'Quantities have been successfully updated.', true, 3000);
        } else {
          this.alertS.error(this.alertContainer, 'Sorry!!! Quantities have been not updated.', true, 5000);
        }
      }
    ).catch(
      err => {
        this.saveClick = null;
        this.alertS.error(this.alertContainer, 'Something wrong!!! Please try again.', true, 5000);
      }
    );
  }

  calculateDataCount() {
    this.start = (this.pagi.page * 100) - 100 + 1;
    let last = this.start + 100 - 1;
    this.end = (last > this.pagi.total) ? this.pagi.total : last;
  }


}