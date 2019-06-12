import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FORMAT_SEARCH } from '../../../../globals/_classes/functions';


class StoreSearch {
  slug: string;
  name: string;
  plan_period: string = '';
  account_type: string = '';
  status: string = "";
}


@Component({
  selector: 'store-filter',
  templateUrl: './store-filter.component.html',
  styleUrls: ['../super-store-list.component.css']
})
export class StoreFilterComponent implements AfterViewInit {

  storeSearch: StoreSearch = new StoreSearch();
  filter:string = '';
  reset: boolean;

  @Output('loadList') loadList:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngAfterViewInit() {
   
  }

  searchUsers(){
    this.filter = FORMAT_SEARCH(this.storeSearch);
    if(this.filter) {
      this.loadList.emit(this.filter);
      this.reset = true;
    }
  }

  resetSearch(){
    this.storeSearch = new StoreSearch();
    this.filter = null;
    if(this.reset) {
      this.loadList.emit('');
      this.reset = false;
    }
  }

}
