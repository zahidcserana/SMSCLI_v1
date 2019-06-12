import {Injectable, Optional} from '@angular/core';
import { ProductServiceConfig, ProductSearch } from '../../product-models/inventory.models';




declare let $:any;


@Injectable()
export class ProductListService {

    config: ProductServiceConfig;

    constructor(@Optional() config: ProductServiceConfig) {
        this.config = config;
    }

    getTags(data) {
      if(data) {
        return data.map((d) => {
          return d.tag_name;
        })
      }
      return [];
    }

    getStatus(data){
      if(data) {
        switch (data) {
          case 1:
            return 'Active';
          case 2:
            return 'Inactive';
          case 3:
            return 'Out of Stock';
          case 4:
            return 'Faulty';
          case 5:
            return 'Delete';
        }
      } 
      return '';
    }
  
    checkStatus(s) {
      if(s) {
        switch (s) {
          case 1:
            return 'm-badge--success';
          case 2:
            return 'm-badge--brand';
          case 3:
            return 'm-badge--primary';
          case 4:
            return 'm-badge--warning';
          case 5:
            return 'm-badge--danger';
        }
      } 
      return '';
    }

  formatSearch(f:string) {
    if(f && f.includes('search')) {
      return f.slice(f.indexOf('=')+1);
    }
    return null
  }

  formatFilter(f:string) {
    const search: ProductSearch = new ProductSearch();
    const arr = f.split('&').filter((f) => {
      return f;
    });
    for(let a of arr) {
      const key = a.split('=');
      if(key && key.length>0) {
        search[key[0]] = key[1] ? key[1] : '';
      }
    }
    return search;
  }

}

