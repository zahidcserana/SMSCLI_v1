import {Injectable, Optional} from '@angular/core';
import {Location} from '@angular/common';
import { SidebarServiceConfig } from './sidebar.models';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

declare let $:any;


@Injectable()
export class SidebarService {

    openSub = new BehaviorSubject<any>(true);
    openFrom = this.openSub.asObservable();

    private subject = new BehaviorSubject<any>(null);
    sidebarOpen = this.subject.asObservable();
    sidebarOpenChange(data) {
        this.subject.next(data);
    }

    config: SidebarServiceConfig;

    constructor(
      @Optional() config: SidebarServiceConfig, 
      private location: Location,
      private router:Router
    ) {
        this.config = config;
    }


      /* sidebar methods */
  
      private getWindowSize():string{
        let w = $(window).width();
        switch (true){
          case w>1300:
            return '50%';
          case w>992:
            return '60%';
          case w>600 && w<992:
            return '80%';
          default:
            return '100%';
        }
      }

      private getWindowCartSize():string{
        let w = $(window).width();
        switch (true){
          case w>1300:
            return '55%';
          case w>992:
            return '65%';
          default:
            return '100%';
        }
      }
  
      openSidebar(size?){
        let width = size ? size : this.getWindowCartSize();

        $('.native-routing').css('width',width).addClass('fadeInRight');
        $('.close-sidebar').css('display','block');
        $('.close-sidebar-upper').css('display','block');
      }

      openCartSidebar(size?){
        let width = size ? size : this.getWindowCartSize();
        let hasData = sessionStorage.getItem('cartId');
        if(hasData) {
          this.openSub.next(true);
        } else {
          this.openSub.next(false);
        }
        $('.native-routing-cart').css('width',width).addClass('fadeInRight');
        $('.close-sidebar-cart').css('display','block');
        $('.close-sidebar-upper-cart').css('display','block');
        this.adjustWidtInCart();
      }
    
      removeSidebar(){
        $('.native-routing').removeClass('fadeInRight').css('width','0px');
        $('.close-sidebar').css('display','none');
        $('.close-sidebar-upper').css('display','none');
      }

      removeCartSidebar(){
        $('.native-routing-cart').removeClass('fadeInRight').css('width','0px');
        $('.close-sidebar-cart').css('display','none');
        $('.close-sidebar-upper-cart').css('display','none');
        $('.header-part').css('position', 'absolute');
        $('.cart-sidebar').css('position', 'absolute');
      }
    
      closeSidebar(location?:string) {
        $('.close-sidebar').click((e)=>{
           this.closeSide(location);
        });

        $('.close-sidebar-upper').click((e)=>{
          console.log('dfsf');
          this.closeSide(location);
        });
      };

      closeSide(location) {
        this.removeSidebar();
          if(location) {
            this.router.navigate([location]);
        }
      }

      closeCartSidebar() {
        $('.close-sidebar-cart').click((e)=>{
          $('.admin-cart').trigger('click');
          $('.admin-cart input').val('');
          this.sidebarOpenChange(false);
          this.removeCartSidebar();
        });

        $('.close-sidebar-upper-cart').click((e)=>{
          $('.admin-cart').trigger('click');
          $('.admin-cart input').val('');
          this.sidebarOpenChange(false);
          this.removeCartSidebar();
        });
      };
    
      adjustWidtInCart() {
        setTimeout(() => {
          let w = $('.m-quick-sidebar--skin-light.cart-sidebar-width').width() + 'px';
          $('.header-part').css('width', w);
          $('.cart-sidebar').css('width', w);
          let hv = $('.header-part').height() + 15 + 'px';
          $('.content').css('height', hv);
          setTimeout(() => {
            $('.header-part').css('position', 'fixed');
            $('.cart-sidebar').css('position', 'fixed');
          }, 500);
        }, 500);
      }

    

}
