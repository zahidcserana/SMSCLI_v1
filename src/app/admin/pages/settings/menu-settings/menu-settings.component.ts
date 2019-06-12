import { Component, OnInit, HostListener, ComponentRef, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { ContentService } from '../setting-service/contents.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { Menu } from '../models/contents.model';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.css']
})
export class MenuSettingsComponent implements OnInit {

  types = {
    Page: [],
    Tag: [],
    Category: []
  }
  menu: Menu = new Menu();
  componentRef: ComponentRef<any>;
  edit: boolean;
  menuList: Menu[] = [];
  loader: boolean;
  sideBaropen: boolean;
  menuIds = [];
  deleteId: number = null;
  

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBaropen) {
      $('.native-routing').css('display', 'block');
      this.sidebarS.openSidebar();
    }
  }


  @ViewChild('menuFormComponent', { read: ViewContainerRef }) pageComponent: ViewContainerRef;
  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private service: ContentService,
    private dragulaS: DragulaService,
    private alert: AlertService,
    private sidebarS: SidebarService,
    private resolver: ComponentFactoryResolver,
    private modalService: NgbModal
  ) {
    this.getPages();
    this.getTags();
    this.getCategories();
    this.loader = true;
    this.getMenuList();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.dragulaS.drop.subscribe(
      value => {
        const before = parseInt(value[1].dataset.id);
        const after = value[4] ? parseInt(value[4].dataset.id) : null;
        this.menuIds = this.service.sortingMenu(before, after, this.menuIds);
        this.updateSortList();
      }
    );
  }

  ngAfterViewInit() {
    this.closeSidebar();
    this.executeAction();
  }  

  trackPage (index, page) {
    return page ? page.id : null;
  }

  private updateSortList() {
    this.service.updateMenuList({ids: this.menuIds}).then(
      res => {
        if(res.status === 'OK') {
          this.menuList = this.service.formatMenuList(this.menuList, this.menuIds);
        }
      }
    ).catch(
      err => this.getMenuList()
    )
  }

  // *************** Get all *************

  private getMenuList() {
    this.loader = true;
    this.service.getMenus().subscribe(
      res => {
        this.menuList = res;
        this.menuIds = this.menuList.map( m => m.id);
        this.loader = false;
      }
    );
  }

  private getPages() {
    this.service.getPages().subscribe(
      res => {
        const result = res.filter( f => f.status === 1);
        this.types.Page = this.service.formatPageDropDown(result).map( m => {
          m['url'] = m.slug;
          return m;
        });
      }
    );
  }

  private getTags() {
    this.service.getTags().subscribe(
      res => {
        this.types.Tag = res;
      }
    );
  }

  private getCategories() {
    this.service.getCategories().subscribe(
      res => {
        this.types.Category = this.service.formateCategories(res);
      }
    );
  }


  //  *************** side bar *********************

   openSidebar() {
    this.sideBaropen = true;
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
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

  private executeAction() {
    this.sideBaropen = false;
    this.sidebarS.removeSidebar();
    $('.native-routing').css('display', 'none');
    if(this.componentRef) {
      this.componentRef.destroy();
    }
  }

  addMenu(type) {
    this.edit = false;
    this.menu = new Menu();
    this.menu.type = type;
    this.createComponent();
    this.openSidebar();
  }

  editMenu(men) {
    this.menu = new Menu();
    this.edit = true;
    this.menu = Object.assign({}, men);
    this.createComponent();
    this.openSidebar();
  }

  // ******************* Create Component *************************

  private createComponent() {
    const factory = this.resolver.resolveComponentFactory(MenuFormComponent);
    this.pageComponent.clear();
    this.componentRef = this.pageComponent.createComponent(factory);
    this.componentRef.instance.types = this.types;
    this.componentRef.instance.menu = this.menu;
    this.componentRef.instance.edit = this.edit;
    this.componentRef.instance.submit.subscribe( e => this.allertShow(e));
  }

  allertShow(e) {
    if(e.message) {
      if (e.status) {
        this.getMenuList();
        this.alert.success(this.alertContainer, e.message, true, 5000);
        this.executeAction();
      } else {
        this.alert.error(this.alertContainer, e.message, true, 5000);
      }
    }
  }

  //  ***************** Delete ********************

  deleteMenu(id, i) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
      .then((result) => {
        if (result) {
          this.deleteId = id;
          this.service.deleteMenu(id).then(res => {
            if (res.status === 'OK') {
              this.menuList.splice(i, 1);
              this.menuIds.splice(i, 1);
              this.alert.success(this.alertContainer,'Menu has been deleted', true, 3000);
            } else {
              this.allertShow({ status: false, message: res.result.error });
            }
            this.deleteId = null;
          }).catch(err => {
            this.allertShow({ status: false, message: 'Something wrong!!! Please try again.' });
            this.deleteId = null;
          });
        }
      }, (res) => {
        console.log(res);
      });
  }

}
