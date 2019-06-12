import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProductSearch, Supplier } from '../../product-models/inventory.models';
import { FORMAT_SEARCH } from '../../../../../globals/_classes/functions';
import { InventoryService } from '../../inventory-serveice/inventory.service';
import { Category } from '../../../settings/models/category.models';
import { ActivatedRoute } from '@angular/router';
import { HttpInspectorService } from '../../../../../modules/http-with-injector/http-inspector.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../../../cart-service/cart.service';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['../product-list.component.css']
})
export class ProductSearchComponent implements OnInit, OnDestroy {

  search:ProductSearch = new ProductSearch();
  filter:string;
  categories: Category[] = [];
  reset: boolean;
  suplliers: Supplier[] = [];
  location = [];
  sub: Subscription; 
  loader: boolean;

  @Output('search') searching:EventEmitter<string> = new EventEmitter();


  constructor(
    private activeRoute:ActivatedRoute,
    private cartS: CartService,
    private inventoryS:InventoryService
  ) { 
    this.suplliers = this.activeRoute.snapshot.data['supplier'].data;
    this.sub = this.cartS.location.subscribe(
      val => {
        if(val) {
          this.location = val;
        }
      }
    );

  }

  ngOnInit() {
    this.inventoryS.getAllCategory().subscribe(
      res =>{
        this.categories = [];
        if(res.data) {
          for(let d in res.data) {
            let obj: Category = new Category(); 
            obj.id = parseInt(d);
            obj.name = res.data[d];
            this.categories.push(obj);
          }
        }
      },  
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  categoryTrack(index,cat){
    return cat? cat.id:null;
  }

  searchProduct(value){
    this.filter = FORMAT_SEARCH(value);
    if(this.filter) {
      this.loader = true;
      this.searching.emit(this.filter);
      this.reset = true;
    }
  }

  resetSearch(f){
    this.filter = null;
    if(this.reset) {
      this.searching.emit('');
      this.reset = false;
    }
  }


}
