import { Component, OnInit } from '@angular/core';
import { Pagi } from '../../../modules/pagination/pagi.model';
import { storeHoshName, domainName } from '../../../globals/endPoint/config';
import { StoreListService } from './store-list.service';
import { eLogin, encrypt } from '../../../globals/_classes/functions';


export interface Store {
  name: string;
  multi_location: boolean;
  online_store: boolean;
  status: number;
}


@Component({
  selector: 'app-super-store-list',
  templateUrl: './super-store-list.component.html',
  styleUrls: ['./super-store-list.component.css']
})
export class SuperStoreListComponent implements OnInit {

  stores: Store[] = [];
  loader: boolean;
  pagi: Pagi = new Pagi();
  deleteId: number;
  hoshName: string = storeHoshName;
  filter:string = '';

  constructor(
    private storeS: StoreListService
  ) {
    this.getStoreList(1, 20);
   }

  ngOnInit() {

  }

  trackStore(index, store) {
    return store? (store.id ? store.id : null) : null;
  }

  getStoreList(p?, l?) {
    this.loader = true;
    this.storeS.getStores(p, l, this.filter).subscribe(
      res => {
        this.loader = false;
        if(res.status == 'OK') {
          this.dataRender(res.result);
        } else {
          this.stores = [];
        }
      },
      err => {
        this.loader = false;
        console.log(err);
        this.stores = [];
      }
    );
  }

  dataRender(res) {
    this.stores = res.data;
    // console.log(this.stores);
    this.pagi.page = parseInt(res.page_no);
    this.pagi.limit = parseInt(res.limit);
    this.pagi.total = parseInt(res.total);
  }

  reloadTable(p) {
    this.getStoreList(p.page, p.limit);
  }

  filterList(e){
    this.filter = e;
    this.getStoreList(1, 20);
  }

  getDomain(store) {
    this.deleteId = store.id;
    this.storeS.getLoginInfoForStore(store.id).subscribe(
      res => {
        this.deleteId = null;
        if(res.status === 'OK') {
          const a = eLogin(encrypt(encrypt(encrypt(JSON.stringify(res.result.data), 'upper'), 'lower')));
          const href = domainName(store.name, 'store') + `/admin/dashboard?user=${a}`;
          window.open(href);
        } else {
          
        }
      }, err => {
        this.deleteId = null;
        console.log(err);
      }
    );
   
  }


}
