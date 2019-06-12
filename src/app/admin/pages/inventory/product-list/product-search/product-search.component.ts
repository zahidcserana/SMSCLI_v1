import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, AfterViewInit, OnChanges } from '@angular/core';
import {Classes, ProductSearch, Sections, Supplier} from '../../product-models/inventory.models';
import { FORMAT_SEARCH } from '../../../../../globals/_classes/functions';
import { InventoryService } from '../../inventory-serveice/inventory.service';
import { Category } from '../../../settings/models/category.models';
import { ActivatedRoute } from '@angular/router';
import { HttpInspectorService } from '../../../../../modules/http-with-injector/http-inspector.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../../../cart-service/cart.service';
import { ProductListService } from '../product-service/product-list.service';
import {Class} from "../../../settings/models/class.models";
import {Section} from "../../../settings/models/section.models";

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['../product-list.component.css']
})
export class ProductSearchComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  search: ProductSearch = new ProductSearch();
  filter:string;
  classes: Class[] = [];
  sections: Section[] = [];
  reset: boolean;
  location = [];
  sub: Subscription[] = [];
  loader: boolean; 

  @Input('checkFilter') checkFilter: boolean;
  @Output('search') searching:EventEmitter<string> = new EventEmitter();


  constructor(
    private activeRoute:ActivatedRoute,
    private cartS: CartService,
    private inventoryS:InventoryService,
    private proS: ProductListService
  ) {
  }

  ngOnChanges() {
    if(this.checkFilter) {
      this.checkFilterData();
    }
  }

  ngOnInit() {
      this.inventoryS.getClasses().subscribe(res => {
          this.classes = res.data;
      });
      this.inventoryS.getSections().subscribe(res => {
          this.sections = res.data;
      });
  }

  ngAfterViewInit() {
    this.checkFilterData();
  }

  ngOnDestroy() {
    for(let s of this.sub) {
      s.unsubscribe();
    }
  }

  checkFilterData() {
    const param = this.activeRoute.snapshot.queryParamMap.get('param');
    const data = param ? param : null;
    if(data && (!data.includes('search'))) {
      if(!$('.search-panel#advanceSearch').hasClass('dis-block')) {
        this.openAdvanceSearch();
      }
      setTimeout(() => {
        this.search = this.proS.formatFilter(data);
        this.reset = true;
        this.checkFilter = false;
      }, 100);
    }
  }

  categoryTrack(index,cat){
    return cat? cat.id:null;
  }
  classTrack(index, sClass){
    return sClass?sClass.id:null;
  }

  sectionTrack(index, section){
      return section?section.id:null;
  }


    searchProduct(value){
    this.filter = FORMAT_SEARCH(value);
    if(this.filter) {
      this.loader = true;
      this.searching.emit(this.filter);
      this.reset = true;
    }
  }

  resetSearch(){
    this.filter = null;
    if(this.reset) {
      this.searching.emit('');
      this.reset = false;
    }
    this.openAdvanceSearch();
  }

  closeFilter() {
    this.search = new ProductSearch();
    if(this.reset) {
      this.openAdvanceSearch();
      this.reset = false;
    }
  }

  openAdvanceSearch() {
    $('.search-panel#advanceSearch').toggleClass('dis-block');
    $('#advanceSearch').toggleClass('la-angle-down la-angle-up');
  }

}
