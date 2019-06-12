import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { AlertService } from '../../../../modules/alert/alert.service';
import { SettingService } from '../setting-service/setting.service';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { Gateway } from '../models/settings.models';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AddFormComponent } from './add-form/add-form.component';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  loader: boolean;
  gateways: Gateway[] = [];
  sideBaropen: boolean;
  gatewayObj;
  componentRef: ComponentRef<any>;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;
  @ViewChild('addFormCard', { read: ViewContainerRef }) cardForm: ViewContainerRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBaropen) {
      $('.native-routing').css('display', 'block');
      this.openSidebar();
    }
  }

  constructor(
    private alert: AlertService,
    private settingS: SettingService,
    private sidebarS: SidebarService,
    private resolver: ComponentFactoryResolver
  ) {
    this.getGatewaySettings();
   }

  ngOnInit() {
    this.getGateways();
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.closeSidebar();
    this.executeAction();
  }

  trackGateway(index, gate) {
    return gate.id ? gate.id : null;
  }

  editGateway(data: Gateway) {
    this.openSidebar({edit: true, data: data});
  }
  addGateway() {
    this.openSidebar({edit: false, data: {}});
  }

  openSidebar(data?) {
    let w = $('.global-sidebar-wrapper').width() + ( $(window).width() > 992 ? 25 : 0) + 'px';
    this.sideBaropen = true;
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar(w);
    if(data) {
      // console.log(data);
      this.settingS.editGateForm.next(data);
      this.createComponent();
    }
  }

  closeSidebar() {
    $('.close-sidebar').click((e) => {
      e.preventDefault();
      this.executeAction();
    });
    $('.close-sidebar-upper').click((e) => {
      e.preventDefault();
      this.executeAction();
    });
  }

  executeAction() {
    this.sideBaropen = false;
    this.sidebarS.removeSidebar();
    $('.native-routing').css('display', 'none');
    if(this.componentRef) {
      this.componentRef.destroy();
    }
  }

  allertShow(e) {
    if(e.message) {
      if (e.status) {
        this.alert.success(this.alertContainer, e.message, true, 5000);
        this.executeAction();
        this.getGateways();
      } else {
        this.alert.error(this.alertContainer, e.message, true, 5000);
      }
    }
  }

  private getGatewaySettings() {
    this.settingS.getGatewaySettings().pipe(map(res => {
      return res.result.data;
    }), catchError(err => {
      return of([]);
    })).subscribe(res => {
      this.gatewayObj = this.settingS.formatGateWay(res);
    });
  }

  getGateways() {
    this.loader = true;
    this.settingS.getGateways().pipe(map(res => {
      return res.result.data;
    }), catchError(err => {
      this.loader = false;
      return of([]);
    })).subscribe(res => {
      this.loader = false;
      this.gateways = res;
    });
    this.executeAction();
  }

  private createComponent() {
    const factory = this.resolver.resolveComponentFactory(AddFormComponent);
    this.cardForm.clear();
    this.componentRef = this.cardForm.createComponent(factory);
    this.componentRef.instance.gatewayAll = this.gatewayObj['all'];
    this.componentRef.instance.methods = this.gatewayObj['list'];
    this.componentRef.instance.allertShow.subscribe( e => this.allertShow(e));
  }

}
