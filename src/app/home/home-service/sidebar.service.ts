import { Injectable, Optional } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare let $: any;


@Injectable()
export class SidebarService {



  constructor() {
  }


  /* sidebar methods */

  private getWindowSize(): string {
    const w = $(window).width();
    switch (true) {
      case w > 1300:

        return '420px';
      case w > 992:
        return '420px';
      case w < 767:
        return '0px';
      default:
        return '0px';
    }
  }

  openSidebar() {
    const width = this.getWindowSize();

    $('.native-routing-home').css('width', width).addClass('fadeInRight');
    $('.close-sidebar-home').css('display', 'block');
  }

  removeSidebar() {
    $('.native-routing-home').removeClass('fadeInRight').css('width', '0px');
    $('.close-sidebar-home').css('display', 'none');
  }

  closeSidebar() {
    $('.close-sidebar-home').click((e) => {
      this.removeSidebar();
    });
  }





}
