import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Coupon } from '../models/settings.models';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { SettingService } from '../setting-service/setting.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { Helpers } from '../../../../helpers';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  couponList: Coupon[] = [];
  sideBaropen: boolean;
  coupon: Coupon;
  loader: boolean;
  pagi: Pagi = new Pagi();

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBaropen) {
      $('.native-routing').css('display', 'block');
      this.sidebarS.openSidebar();
    }
  }

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private sidebarS: SidebarService,
    private settingS: SettingService,
    private alertS: AlertService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.coupon = new Coupon();
    const list = this.activeRoute.snapshot.data['list'];
    // console.log(list);
    if (list) {
      this.dataList(list);
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.closeSidebar();
    this.executeAction();
  }

  trackCoupon(index, co) {
    return co ? co.id : null;
  }

  reloadTable(e) {
    // console.log(e);
    this.getCoupons(e.page, e.limit);
  }

  getCoupons(p, l) {
    this.loader = true;
    this.dataRender(p, l);
  }

  private dataRender(p?, l?) {
    this.settingS.getCoupons(p, l).subscribe(
      res => {
        this.dataList(res);
        this.loader = false;
      },
      err => console.log(err)
    );
  }

  private dataList(res) {
    this.couponList = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 10;
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
    this.sideBaropen = null;
    this.sidebarS.removeSidebar();
    $('.native-routing').css('display', 'none');
  }

  initAddCoupon() {
    this.coupon = new Coupon();
    this.settingS.addEditChange({open: true, edit: false});
    this.sideBaropen = true;
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
  }

  editCoupon(cop) {
    this.coupon = new Coupon();
    this.settingS.addEditChange({open: true, edit: true});
    this.sideBaropen = true;
    this.coupon = Object.assign({}, cop);
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
  }

  openSidebar() {
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
    this.sideBaropen = true;
  }

  deleteCoupon(id) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
      .then((result) => {
        if (result) {
          Helpers.setLoading(true);
          this.archiveCoupon(id);
        }
      }, (res) => {
        console.log(res);
      });

  }

  archiveCoupon(id) {
    this.settingS.deleteCoupon(id).then(
      res => {
        this.dataRender(this.pagi.page, this.pagi.limit);
        this.alert({error: false, message: 'Coupon has been deleted'});
      }
    ).catch (
      err => {
        console.log(err);
        this.alert({error: true, message: 'Something wrong! Coupon has been not deleted'});
      }
    )
  }

  submitCoupon(event) {
    // console.log(event);
    if(!event.alert.error) {
      if(event.add) {
        this.pagi.total++;
        if (this.pagi.page == 1) {
          const size = this.couponList.length;
          if (size === 10) {
            this.couponList.splice(9, 1);
            this.couponList.splice(0, 0, event.data);
          } else {
            this.couponList.splice(0, 0, event.data);
          }
        } else {
          this.dataRender(this.pagi.page, this.pagi.limit);
        }
      } else {
        let index = this.couponList.findIndex((c) => {
          return event.data.id == c.id;
        });
        if(index>-1) {
          this.couponList[index] = event.data;
        } 
      }
      this.executeAction();
    }
    this.alert(event.alert);
  }

  alert(data) {
    Helpers.setLoading(false);
    if (data.error) {
      this.alertS.error(this.alertContainer, data.message, true, 5000);
    } else {
      this.alertS.success(this.alertContainer, data.message, true, 5000);
    }
  }

  getDate(d) {
    return new Date(d);
  }

}
