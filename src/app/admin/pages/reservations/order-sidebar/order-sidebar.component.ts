import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

class Menu {
  cus = true;
  item = true;
  pay = true;
  del = true;
}

@Component({
  selector: 'app-order-sidebar',
  templateUrl: './order-sidebar.component.html',
  styleUrls: ['./order-sidebar.component.css']
})
export class OrderSidebarComponent implements OnInit {

  menu: Menu;
  refund: boolean;

  constructor(
    private activeRoute: ActivatedRoute
  ) {
    const path = this.activeRoute.snapshot['_routerState'].url;
    // console.log(path);
    this.checkRoute(path);
  }

  ngOnInit() {
  }

  checkRoute(path) {
    switch (true) {
      case path.includes('details/edit/customer'):
        this.menu = new Menu();
        this.menu.cus = false;
        this.refund = false;
        break;
      case path.includes('details/edit/product'):
        this.menu = new Menu();
        this.menu.item = false;
        this.refund = false;
        break;
      case path.includes('details/edit/payment'):
        this.menu = new Menu();
        this.menu.pay = false;
        this.refund = false;
        break;
      case path.includes('details/edit/delivery'):
        this.menu = new Menu();
        this.menu.del = false;
        this.refund = false;
        break;
      case path.includes('details/edit/refund'):
        this.refund = true;
        break;
      default:
        this.menu = new Menu();
        this.menu.cus = false;
        this.menu.item = false;
        this.menu.pay = false;
        this.menu.del = false;
        this.refund = false;
        break;
    }
  }

}
