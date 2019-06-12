import {Component, OnInit, ViewEncapsulation, AfterViewInit, HostListener, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { EndPoint, product_image } from '../../../../globals/endPoint/config';
import { ProductListData } from '../product-models/inventory.models';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { ProductListService } from './product-service/product-list.service';
import { InventoryService } from '../inventory-serveice/inventory.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { Helpers } from '../../../../helpers';
import { CartService } from '../../../cart-service/cart.service';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { GET_STORE_ID, downloadFile, singleOrNot } from '../../../../globals/_classes/functions';
import { Subscription } from 'rxjs';

declare let $:any;

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {

  productList:ProductListData[] = [];
  sidebarOpen:boolean;
  filter:string;
  selectedId = null;
  search: string;
  load: boolean;
  loader: boolean;
  end = EndPoint + 'products/export';
  pagi: Pagi = new Pagi();
  image = product_image + GET_STORE_ID();
  sub: Subscription[] = [];
  goTop: boolean;
  reloadFilter: boolean;
  pro_id: any;
  copyDone: boolean;


  @ViewChild('hasCusAlert') alertContainer: ElementRef;
  @ViewChild('searchPro') searchPro;

  constructor(
    private router: Router,
    private alertS: AlertService,
    private route: ActivatedRoute,
    private productS: ProductListService,
    private inventoryS: InventoryService,
    private sidebarS: SidebarService,
    private cartS: CartService,
    private modalService: NgbModal
  ) {
    this.checkRoute();
    this.sub[0] = this.route.queryParamMap.subscribe(
      val => {
        const path = this.route.snapshot['_routerState'].url;
        if(!path.includes('edit')) {
          this.pagi.limit = this.pagi.limit ? this.pagi.limit : 20;
          this.filter = this.filter ? this.filter : '';
          this.pagi.page = this.pagi.page ? this.pagi.page : 1;
          this.pagi.page = val.get('page') ? parseInt(val.get('page')) : this.pagi.page;
          this.pagi.limit = val.get('limit') ? parseInt(val.get('limit')) : this.pagi.limit;
          this.filter = val.get('param') ? val.get('param') : this.filter;
          this.search = this.productS.formatSearch(this.filter);
          this.getProductList(this.pagi.page, this.pagi.limit, this.filter);
        } else {
          if(!this.pagi.page) {
            this.formatPage();
            this.search = this.productS.formatSearch(this.filter);
            this.getProductList(this.pagi.page, this.pagi.limit, this.filter);
          }  
        }
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sidebarOpen) {
      this.openSidbarWithSize();
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.sub[1] = this.cartS.reloadInventory.subscribe(
      val => {
        if(val) {
          this.getProductList(this.pagi.page, this.pagi.limit, this.filter);
        }
      }
    );
  }

  ngAfterViewInit() {
    this.closeEdit();
  }

  ngOnDestroy() {
    for(let s of this.sub) {
      s.unsubscribe();
    }
  }

  copyUrl(copyText) {
    copyText.select();
    document.execCommand('copy');
    this.copyDone = true;
    setTimeout(() => {
      this.copyDone = false;
    }, 2000);
  }

  single(v) {
    return singleOrNot(v)
  }

  makeQuryparam(param) {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: param
    });
  }

  checkRoute() {
    const event = this.router.events;
        event.map((e) => {
              const editRoute = this.router.createUrlTree(['edit'], {relativeTo: this.route});
              return this.router.isActive(editRoute, false);
          }).subscribe(active => {
            if (active) {
              this.openSidbarWithSize();
            } else {
              this.sidebarS.removeSidebar();
            }
            this.sidebarOpen = active;
      });
  }

  private openSidbarWithSize() {
    if(this.route.snapshot['_routerState'].url.includes('calendar')) {
      let w = $('.global-sidebar-wrapper').width() + ( $(window).width() > 992 ? 25 : 0) + 'px';
      this.sidebarS.openSidebar(w);
    } else {
      this.sidebarS.openSidebar();
    }
  }

  getProductList(p, l ,q) {
    this.loader = true;
    q = this.pro_id ? q + '&product_id=' + this.pro_id : q;
    this.inventoryS.getAllProduct(p, l, q).subscribe(
      res => {
        if(this.goTop) {
          window.scrollTo(0, 0);
        }
        this.loader = false;
        this.searchPro.loader = false;
        if(res.status == 'OK') {
          if(this.pro_id) {
            const index = this.productList.findIndex( f => f.id === this.pro_id);
            if(index > -1 && res.result.data[0]) {
              this.productList[index] = (res.result.data)[0];
            }
            this.pro_id = null;
          } else {
            this.productList = res.result.data;
            this.pagi.page = res.result.page_no ? JSON.parse(res.result.page_no) : 1;
            this.pagi.limit = res.result.limit ? JSON.parse(res.result.limit) : 20;
            this.pagi.total = res.result.total ? JSON.parse(res.result.total) : 0;
          }
        } else {
          this.error();
        }
        this.pro_id = null;
      },
      err => this.error()
    );
  }
  
  error() {
    this.alertS.error(this.alertContainer, "Something wrong!!! Please try again.", true, 3000);
    this.productList = [];
    this.loader = false;
    this.searchPro.loader = false;
    this.pro_id = null;
  }

  tarckProduct(index, pro) {
    return pro ? pro.id : null;
  }

  checkAll(e) {
    if(e.target.checked) {
      this.checkUncheck(true);
      this.selectedId = this.productList.map((m) => {
        return m.id;
      }).join(',');
    } else {
      this.checkUncheck(false);
      this.selectedId = null;
    }
  }

  checkUncheck(d) {
    this.productList = this.productList.map((m) => {
      m['check'] = d;
      return m;
    });
  }

  checkOne(e, i) {
    this.productList[i]['check'] = e.target.checked;
    this.selectedId = this.productList.filter((f) => {
      return f['check'];
    }).map((m) => {
      return m.id;
    }).join(',');
  }

  reloadTable(e) {
    this.pagi.page = e.page;
    const obj = {
      page: this.pagi.page, limit: this.pagi.limit,  param: this.filter
    }
    
    if(this.pagi.limit != e.limit) {
      this.pagi.page = Math.ceil(this.pagi.total / e.limit) <= this.pagi.page ? Math.ceil(this.pagi.total / e.limit) : this.pagi.page;
      this.pagi.limit = e.limit;
      obj.limit = e.limit;
      obj.page = this.pagi.page;
    } else {
      delete obj.limit;
    }
    
    this.goTop = true;
    if(this.filter) {
      this.makeQuryparam(obj);
    } else {
      delete obj.param;
      this.makeQuryparam(obj);
    }
  }

    loadSearchData(filter){
      this.filter = filter;
      this.selectedId = null;
      this.pagi.page = 1;
      this.goTop = true;
      if(this.filter) {
        this.makeQuryparam({page: this.pagi.page, param: this.filter});
      } else {
        this.makeQuryparam({page: this.pagi.page});
      }
      this.search = null;
    }

    searchList(value) {
      this.searchPro.closeFilter();
      this.selectedId = null;
      this.goTop = true;
      if(value.search) {
        const search = '&search=' + value.search.trim();
        this.filter = search;
      }
      this.pagi.page = 1;
      this.makeQuryparam({page: this.pagi.page, param: this.filter});
    }

    reset(f) {
      if(this.search) {
        this.filter = '';
        this.pagi.page = 1;
        this.goTop = true;
        this.makeQuryparam({page: this.pagi.page});
      }
      f.form.reset();
    }

    openCartSidebar(pro) {
      this.cartS.getProductId({id: pro.id, name: pro.name});
      this.sidebarS.openCartSidebar();
      this.sidebarS.sidebarOpenChange(true);
    }

    gotoProduct(pro) {
      window.open(`/product/${pro.uuid}/${pro.url}`);
    }

    openSidebar(pro, route) {
      this.pro_id = pro.id;
      sessionStorage.setItem('proInfo', JSON.stringify({page: this.pagi.page, limit: this.pagi.limit, filter: this.filter}));
      this.router.navigate([`edit/${pro.id}/${route}`], {relativeTo: this.route});
    }

    checkStatus(s) {
      return this.productS.checkStatus(s);
    }

    getStatus(s) {
      return this.productS.getStatus(s);
    }

    private formatPage() {
      const data = JSON.parse(sessionStorage.getItem('proInfo'));
      this.pagi.limit = this.pagi.limit ? this.pagi.limit : (data ? data.limit : 20);
      this.filter = this.filter ? this.filter : (data ? data.filter : '');
      this.pagi.page = this.pagi.page ? this.pagi.page : (data ? data.page : 1);
    }

    private closeEdit(){
      $('.close-sidebar').click((e)=>{
        e.preventDefault();
        this.close();
      });
      $('.close-sidebar-upper').click((e)=>{
        e.preventDefault();
        this.close();
      });
    }

    private close() {
        this.sidebarOpen = false;
        this.sidebarS.removeSidebar();
        this.router.navigate(['admin/inventory']);
        this.goTop = false;
        this.formatPage();
        this.reloadFilter = true;
        if(this.filter) {
          this.makeQuryparam({page: this.pagi.page, param: this.filter});
        } else {
          this.makeQuryparam({page: this.pagi.page});
        }
        sessionStorage.removeItem('proInfo');
    }


    deleteProductList(id){
        this.deleteDialog('Are you sure you want to archive?')
        .then((result)=>{
          if(result){
            this.archiveProduct(id);
          }
        },(res)=>{
          console.log(res);
        });
    }

    permanentDeleteProductList(id){
      this.deleteDialog('Are you sure you want to permanently delete?')
        .then((result)=>{
          if(result){
            this.archiveProduct(id);
          }
        },(res)=>{
          console.log(res);
        });
    }

    deleteDialog(message){
      const modalRef = this.modalService.open(DialogBoxComponent,{
        centered:true,
        size:'sm',
        windowClass: 'animated fadeIn'
      });
      modalRef.componentInstance.massage = message;
      return modalRef.result;
    }

    archiveProduct(id){
      Helpers.setLoading(true);
      this.inventoryS.deleteProduct(id)
      .then(
        res=>{
            Helpers.setLoading(false);
            if(res.status == 'OK') {
              this.alertS.success(this.alertContainer, res.result.message, true, 5000);  
              this.goTop = false;  
              this.getProductList(this.pagi.page, this.pagi.limit, this.filter);
            } else {
              this.alertS.error(this.alertContainer,res.result.error, true, 5000);
            }
        },
        err=>{
          console.log(err);
          Helpers.setLoading(false);
          this.alertS.error(this.alertContainer,'Something worng!!! Please try again', true, 5000);
        }
      );
    }

    export() {
      if (this.filter || this.selectedId || this.search) {
        this.exportProduct(true);
      } else {
        this.dilogBox();
      }
    }
    
    dilogBox() {
      this.deleteDialog('Do you want to export "' + this.pagi.total + '" number of products?')
      .then((result)=>{
        if(result){
          this.exportProduct(false);
        }
      },(res)=>{
        console.log(res);
      });
    }

    exportProduct(has) {
      let params = '?export_id=';
      if (has) {
        params +=  this.selectedId ? this.selectedId : '';
        if(this.filter) {
          params += this.filter;
        } else if (this.search) {
          params += this.search;
        }
      }
      this.inventoryS.exportProduct(params).then(
        res => {
          downloadFile(res);
        },
        err => {
          console.log(err);
          this.alertS.error(this.alertContainer, 'Something wrong!!! Products have not been exported', true, 3000);
        }
      );
    }

  }