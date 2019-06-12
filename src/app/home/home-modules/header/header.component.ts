import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { Tag, CartItem, Cart } from '../type.model';
import { HomeService } from '../../home-service/home.service';
import { CartService } from '../../home-service/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentResoveService } from '../../home-service/contetn-resolve.service';
import { getLogo } from '../layout.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  contents;
  count = 0;
  total = 0;
  cartItems: CartItem[] = [];
  cart: Cart;
  logo = getLogo();
  tags: Tag[] = [];
  sub: Subscription[] = [];
  store_info = { title: '', description: '' };
  menus = [];

  constructor(
    public contentService: ContentResoveService,
    private router: Router,
    private cartService: CartService,
    private service: HomeService, ) {

  }

  ngOnInit() {
    this.sub[0] = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        $('.cart-body').slideUp(200);
      }
    });

    this.sub[1] = this.cartService.cartReload.subscribe(val => this.getCarts());

    this.getStoreContent();

    this.getTag();
    this.getMenuList();
  }

  ngOnDestroy() {
    this.sub.forEach(f => f.unsubscribe());
  }

  getStoreContent() {
    this.contents = this.contentService.contents;
    if (this.contentService.contents.store_title && this.contentService.contents.store_info) {
      this.store_info.title = this.contentService.contents.store_title; // tag name = store_title
      this.store_info.description = this.contentService.contents.store_info; // tag name = store_info
    }
  }

  getTag() {
    this.service.getTags().subscribe(
      res => {
        if (res.length) {
          this.tags = res.filter(item => {
            if (item.is_shown_in_nav === true) {
              return true;
            }
          });
          //  localStorage['tags'] = JSON.stringify(this.tags);
          this.service.setTags(this.tags);
        }
      }
    );
    // this.service.getTags().pipe(startWith(JSON.parse(localStorage['tags'] || '[]')));
  }


  changeTag(m) {
    if (m.content_type === 'Tag') {
      const data = this.tags.find(f => f.id === m.content_id);
      if (data) {
        this.service.tagIdreload.next({ reload: true, tag: data });
      }
    }
  }

  getCarts() {
    if (this.cartService.userCart) {
      this.cart = this.cartService.userCart;
      this.cartItems = this.cart.cart_items ? this.cart.cart_items : [];
      this.count = this.cartItems.length;
      this.total = this.cart ? this.cart.sub_total : 0;
    } else {
      this.cart = null;
      this.cartItems = [];
      this.count = 0;
      this.total = 0;
    }
  }

  trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  getMenuList() {
    this.service.getMenus().subscribe(
      res => {
        const data = this.formatMenu(res);
        this.menus = data['head'].filter((m, i) => i < 5);
        this.service.footer.emit(data['foot']);
      }
    );
  }

  private formatMenu(data) {
    const head = [], foot = { quick: [], more: [] };
    const menu = data.filter(m => m.status);
    for (const d of menu) {
      if (d.type === 'header') {
        head.push(d);
      } else {
        if (d.type === 'footer_more_links') {
          foot.more.push(d);
        } else {
          foot.quick.push(d)
        }
      }
    }
    return { head: head, foot: foot }
  }

}
