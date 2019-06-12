import { Component, OnInit, HostListener, AfterContentInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { VariantSet } from '../models/settings.models';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { SettingService } from '../setting-service/setting.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { Helpers } from '../../../../helpers';
import { calculatePage, SORTING, FORMATESORT } from '../../../../globals/_classes/functions';

declare let $: any;


@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit, AfterViewInit {

  attributeSetsList: VariantSet[];
  attributeSet: VariantSet;
  sideBarName: string = null;
  updateSetName: boolean;
  pagi: Pagi = new Pagi();
  loader: boolean;
  sort = {};

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBarName) {
      $('.native-routing').css('display', 'block');
      this.sidebarS.openSidebar();
    }
  }

  constructor(
    private sidebarS: SidebarService,
    private modalService: NgbModal,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private settingS: SettingService,
    private alertS: AlertService
  ) {
    const list = this.activeRoute.snapshot.data['list'];
    // console.log(list);
    this.dataList(list);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.closeSidebar();
    this.executeAction();
  }

  trackAttribute(index, att) {
    return att ? att.id : null;
  }

  queryParam(query) {
    this.router.navigate(['./'], {
      relativeTo: this.activeRoute,
      queryParams: query
    });
  }

  reloadTable(e) {
    // console.log(e);
    const query = FORMATESORT(this.sort);
    this.getAttrbuteSets(e.page, e.limit, query);
  }

  getAttrbuteSets(p, l, s?) {
    this.loader = true;
    this.dataRender(p, l, s);
  }

  private dataRender(p?, l?, sort?) {
    this.settingS.getAttributeSets(p, l, sort).subscribe(
      res => {
        this.dataList(res);
        this.loader = false;
      },
      err => console.log(err)
    );
  }

  private dataList(res) {
    this.attributeSetsList = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page_no']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 10;
    this.queryParam({page: this.pagi.page, order_by: this.sort['order_by'], order: this.sort['order']});
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
    this.sideBarName = null;
    this.sidebarS.removeSidebar();
    $('.native-routing').css('display', 'none');
  }

  initAddAttribute() {
    this.attributeSet = new VariantSet();
    this.sideBarName = 'add';
    this.updateSetName = false;
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
  }

  editAttribute(attr, i) {
    this.sideBarName = 'add';
    this.updateSetName = true;
    this.attributeSet = Object.assign({}, attr);
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
  }

  deleteAttributeSet(att_id, i) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result) => {
      if (result) {
        Helpers.setLoading(true);
        this.archiveAttributeSet(att_id, i);
      }
    }, (res) => {
      console.log(res);
    });
  }

  archiveAttributeSet(id, i) {
    this.settingS.deleteAttributeSet(id).then(
      res => {
        this.loadTable();
        Helpers.setLoading(false);
        this.alert({error: false, message: 'Variant has been deleted'});
        this.attributeSetsList.splice(i, 1);
      }
    ).catch (
      err => {
        console.log(err);
        Helpers.setLoading(false);
        this.alert({error: true, message: 'Something wrong! Variant has been not deleted'});
      }
    );
  }

  loadTable() {
    let d = calculatePage(this.pagi.page, this.pagi.limit, this.pagi.total);
    // console.log(d);
    if(d.change) {
      this.dataRender(d.page, d.limit);
    } else {
      this.pagi.total--;
    }
  }


  viewAttribute(attr) {
    this.sideBarName = 'view';
    this.attributeSet = attr;
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
  }

  submitAttributeSet(event) {
    console.log(event);
    this.dataRender(this.pagi.page, this.pagi.limit);
    this.alert(event.alert);
  }

  alert(data) {
    if (data.error) {
      this.alertS.error(this.alertContainer, data.message, true, 5000);
    } else {
      this.alertS.success(this.alertContainer, data.message, true, 5000);
    }
  }

  formateAttrivutes(value) {
    if (value.length > 0) {
      return value.map((v) => {
        return v.name;
      }).join(', ');
    }
    return '';
  }

  sorting(id) {
    this.sort = SORTING(id, this.sort);
    const query = FORMATESORT(this.sort);
    this.dataRender(this.pagi.page, this.pagi.limit, query);
    // console.log(this.sort);  
  }

}
