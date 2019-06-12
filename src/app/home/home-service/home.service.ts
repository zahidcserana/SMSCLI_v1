import { Injectable, Optional, EventEmitter } from '@angular/core';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { shipping } from '../../globals/_classes/functions';
import { map, catchError, startWith, filter } from 'rxjs/operators';
import { Tag } from '../home-modules/type.model';

declare let $: any;

export interface TagReloadconfig {
  reload: boolean;
  tag?: Tag;
}
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private tagIdSubject: TagReloadconfig = { reload: false };
  tagIdreload = new BehaviorSubject(this.tagIdSubject);
  footer: EventEmitter<any> = new EventEmitter();

  private tags: Tag[];

  // changeUser(user) {
  //   this.USER.next(user);
  // }

  // tslint:disable-next-line:member-ordering
  allCategory: BehaviorSubject<any> = new BehaviorSubject([]);
  // tslint:disable-next-line:member-ordering
  allTag: BehaviorSubject<any> = new BehaviorSubject([]);

  getTags() {
    return this.http.get('tags').pipe(map(res => {
      return res.result.data;
    }), catchError(err => of([])));

  }

  getMenus() {
    return this.http.get('navigations').pipe(map(res =>  res.result.data), catchError(err => of([])));
  }

  getLocations() {
    return this.http.get(`products/locations`).pipe(map(res => res)).toPromise().then(
      res => {
        if (res.status === 'OK') {
          return res.result.data;
        } else {
          return [];
        }
      }).catch(
        err => {
          console.log(err);
          return [];
        }
      );
  }


  constructor(
    private http: HttpService
  ) {
  }

  setTags(tags: Tag[]) {
    this.tags = tags;
  }

  getAllTags() {
    return this.tags;
  }




  clearLocalStorage() {
    if (localStorage.getItem('confirmOrder') === String(1)) {
      localStorage.removeItem('orderId');
      localStorage.removeItem('billingInfo');
      localStorage.removeItem('user_cart');
      localStorage.removeItem('token');
      sessionStorage.removeItem('pickup');
      localStorage.removeItem('confirmOrder');
      this.reserStore();
    }
  }
  checkCart(cart_id) {
    return this.http.get('check-cart/' + cart_id).toPromise()
      .then(res => {
        return res.result.data.status;
      });
  }

  reserStore() {
    this.getLocations().then(
      res => {
        res.filter(item => {
          item.selected = false;
        });
      }
    );
  }
}
