import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import {Classes, Supplier} from '../models/settings.models';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { SettingService } from '../setting-service/setting.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { Helpers } from '../../../../helpers';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  classes: Classes[] = [];
  supplierList: Supplier[] = [];
  sideBaropen: boolean;
  supplier: Supplier;
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
    this.supplier = new Supplier();
    const list = this.activeRoute.snapshot.data['list'];
    // console.log(list);
    if (list) {
      this.dataList(list);
    }
  }

  ngOnInit() {
    this.getClasses();
  }

    getClasses() {
        this.settingS.getClasses().subscribe(res => {
            this.classes = res.data;
        });
    }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.closeSidebar();
    this.executeAction();
  }

  tracksupplier(index, co) {
    return co ? co.id : null;
  }

  reloadTable(e) {
    // console.log(e);
    this.getSuppliers(e.page, e.limit);
  }

  getSuppliers(p, l) {
    this.loader = true;
    this.dataRender(p, l);
  }

  private dataRender(p?, l?) {
    this.settingS.getSection(p, l).subscribe(
      res => {
        this.dataList(res);
        this.loader = false;
      },
      err => console.log(err)
    );
  }

  private dataList(res) {
    this.supplierList = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 20;
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

  initAddSupplier() {
    this.supplier = new Supplier();
    this.settingS.addEditChange({open: true, edit: false});
    this.sideBaropen = true;
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
  }

  editSupplier(cop) {
    this.supplier = new Supplier();
    this.settingS.addEditChange({open: true, edit: true});
    this.sideBaropen = true;
    this.supplier = Object.assign({}, cop);
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
  }

  openSidebar() {
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
    this.sideBaropen = true;
  }

  deleteSupplier(id) {
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
          this.archiveSupplier(id);
        }
      }, (res) => {
        console.log(res);
      });

  }

  archiveSupplier(id) {
    this.settingS.deleteSection(id).then(
      res => {
        if(res.status === 'OK') {
          this.dataRender(this.pagi.page, this.pagi.limit);
          this.alert({error: false, message: res.result.message});
        } else {
          this.alert({error: true, message: res.result.error});
        }
      }
    ).catch (
      err => {
        console.log(err);
        this.alert({error: true, message: 'Something wrong! Supplier has been not deleted'});
      }
    )
  }

  submitSupplier(event) {
    // console.log(event);
    if(!event.alert.error) {
      this.dataRender(this.pagi.page, this.pagi.limit);
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
