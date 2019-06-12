import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Helpers } from '../../../helpers';
import { User_login } from '../../pages/user-management/models/user.models';
import { user_image } from '../../../globals/endPoint/config';
import { AdminService } from '../../admin.service';
import { GET_USER, changeUser } from '../../../globals/_classes/functions';
import { SidebarService } from '../../pages/sidebar-service/sidebar.service';
import { CartService } from '../../cart-service/cart.service';
import { AlertService } from '../../../modules/alert/alert.service';
import { Terminal, Stores } from '../../pages/settings/models/settings.models';


declare let mLayout: any;

@Component({
selector: "app-header-nav",
templateUrl: "./header-nav.component.html",
encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

image_url:string;
user:User_login;
cartNo: number;
store: Stores;
storelList: Stores[] = [];
terminal: Terminal;

@ViewChild('hasCusAlert') alertContainer: ElementRef;

constructor(
  private alertS: AlertService,
  private adminS: AdminService,
  private sidebarS: SidebarService,
  private cartS: CartService
) {
  this.cartS.cartNo.subscribe(
    val => this.cartNo = val && val.cart_items ? val.cart_items.length : 0
  );
  this.adminS.stores.subscribe(
    val => {
      if(val) {
        this.formatStores(val);
        if(this.store && this.store.stores_terminals.length < 1) {
          changeUser('terminal_id', null);
        }
        this.adminS.changeUser(GET_USER());
      }
    }
  );
}

ngOnInit()  {
    this.userChange();
    this.getImageUrl();
    this.getTerminal();
}
ngAfterViewInit()  {
    mLayout.initHeader();
}
  getImageUrl(){
    this.user = GET_USER();
    this.image_url = user_image + this.user.image;
  }

  getTerminal() {
    this.cartS.getterminals().subscribe(
      res => {
        if(res.status == 'OK') {
          // console.log(res.result.data);
          this.formatStores(res.result.data);
        } else {
          this.storelList = [];
          this.store = null;
        }
      },
      err => {
        console.log(err);
        this.storelList = [];
      }
    );
  }

  formatStores(data) {
    this.cartS.changeLoc(data);
    this.storelList = data.filter((d) => d.status == 1);
    if(this.user.location_id) {
      this.store = this.storelList.find((d) => d.id == this.user.location_id);
      if(this.user['terminal_id'] && this.store) {
        this.terminal = this.store.stores_terminals.find((d) => d.id == this.user['terminal_id']);
      } else {
        this.terminal = null;
        changeUser('terminal_id', null);
      }
    } else {
      this.store = null;
      this.terminal = null;
    }
  }

  selectStore(data) {
    const cho = {
      user_id: this.user.user_id,
      location_id: data.id
    }
    this.chooseStore(cho, data); 
  }

  chooseStore(data, select) {
    this.cartS.sendStoreData(data).then(
      res => {
        if(res.status == 'OK') {
          this.store = select;
          this.terminal = this.store.stores_terminals[0] ? this.store.stores_terminals[0] : null;
          changeUser('location_id', this.store.id);
          this.cartS.reloadInventory.next(true);
          changeUser('terminal_id', this.terminal ? this.terminal.id : null);
          this.alertS.success(this.alertContainer, 'Location has been successfully selected', true, 3000);
          this.adminS.changeUser(GET_USER());
        } else {
          this.error('Location has not been selected');
        }
      }
    ).catch(
      err => {
        console.log(err);
        this.error('Location has not been selected');
      }
    );
  }

  selectTerminal(data) {
    const cho = {
      user_id: this.user.user_id,
      location_id: this.store.id,
      terminal_id: data.id 
    }
    if(data.status == 0) {
      this.alertS.info(this.alertContainer, 'Terminal is not active. Please active the terminal.', true, 3000);
    } else {
      this.chooseTreminal(cho);
    }
  }

  chooseTreminal(data) {
    this.cartS.sendterminData(data).then(
      res => {
        console.log(res);
        if(res.status == 'OK') {
          // this.terminal = data;
          // changeUser('terminal_id', this.terminal.id);
          // this.alertS.success(this.alertContainer, 'Terminal has been successfully selected', true, 3000);
          // this.adminS.changeUser(GET_USER());
        } else {
          this.terminal = null; 
        }
      }
    ).catch(
      err => {
        console.log(err);
        this.error('Terminal has not been selected');
      }
    );
  }


  error(massage) {
    this.alertS.error(this.alertContainer, massage, true, 3000);
    this.store = null;
  }

  userChange(){
    this.adminS.user.subscribe(user=>{
      this.user = user;
      this.image_url = user_image + this.user.image;
    });
  }

  checkImage(){
    if(this.user && this.user.image) return true;
    return false;
  }

  openSidebar() {
    const store = GET_USER().location_id;
    if(store) {
      this.sidebarS.sidebarOpenChange(true);
      this.sidebarS.openCartSidebar();
    } else {
      this.alertS.info(this.alertContainer, "Store has not been selected. Please select store.", true, 5000);
    }
  }


}