import {Component, OnInit, ViewEncapsulation, AfterViewInit, HostListener, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { Location } from '@angular/common';
import { SidebarService } from '../sidebar-service/sidebar.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboarService } from './dashboard.service/dashboard.service';
import { AlertService } from '../../../modules/alert/alert.service';


declare let $:any;

@Component({
  selector: 'app-blank',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  card;
  sidebarOpen: boolean;
  sub: Subscription[] = [];
  fromDash: boolean;
  loader: boolean;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
    onResize(event) {
    if (this.sidebarOpen && this.fromDash) {
      this.createNewOrder();
    }
}

  constructor(
    private sideBarS: SidebarService,
    private router: Router,
    private alertS: AlertService,
    private dashS: DashboarService,
    private location: Location
  ) {
    const path = this.location.path();
    if(path.includes('?')) {
      this.location.replaceState(path.split('?')[0]);
    }
  }

  ngOnInit() {

    this.sub[0] = this.sideBarS.sidebarOpen.subscribe(
      val => {
        this.sidebarOpen = val;
        this.fromDash = false;
        this.sideBarS.closeCartSidebar();
      }
    );
    this.sub[1] = this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.sidebarOpen = false;
      }
    });
    
  }

  ngAfterViewInit(){
    this.sideBarS.closeCartSidebar();
  }

  ngOnDestroy() {
		this.sub.forEach(s => {
			s.unsubscribe();
		});
	}

  createNewOrder() {
    this.fromDash = true;
    this.sidebarOpen = true;
    let w = $('.global-sidebar-wrapper').width() + ( $(window).width() > 992 ? 25 : 0) + 'px';
    // console.log(w);
    this.sideBarS.openCartSidebar(w);
  }

  goToClassList() {
    this.router.navigate(['admin/settings/location'])
  }
  goToSectionList() {
    this.router.navigate(['admin/settings/supplier'])
  }
  goToStudentList() {
    this.router.navigate(['admin/inventory'])
  }


}