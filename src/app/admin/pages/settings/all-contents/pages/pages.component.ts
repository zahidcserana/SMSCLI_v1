import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Content, PageContent } from '../../models/contents.model';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../setting-service/contents.service';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { AddFormComponent } from './add-form/add-form.component';
import { SidebarService } from '../../../sidebar-service/sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, AfterViewInit {

  pages = [];
  config: PageContent = new PageContent();
  componentRef: ComponentRef<any>;
  edit: boolean;
  pageList: PageContent[] = [];
  loader: boolean;
  sideBaropen: boolean;
  deleteId: number = null;
  addNew: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBaropen) {
      $('.native-routing').css('display', 'block');
      this.sidebarS.openSidebar();
    }
  }


  @ViewChild('pageFormComponent', { read: ViewContainerRef }) pageComponent: ViewContainerRef;
  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private service: ContentService,
    private alert: AlertService,
    private sidebarS: SidebarService,
    private resolver: ComponentFactoryResolver,
    private modalService: NgbModal
  ) {
    this.loader = true;
    this.getContentList();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    this.closeSidebar();
    this.executeAction();
  }

  isAllowDelete (s) {
    const a = this.service.initPageDropDown.map( m => m.slug);
    return !a.includes(s.trim());
  }

  private getContentList() {
    this.service.getPages().subscribe(
      res => {
        this.pageList = res;
        this.pages = this.pageList.filter( f => f.status === 1).map( m => {
          return {slug: m.slug, name: m.name};
        });
        this.pages = this.service.formatPageDropDown(this.pages);
        this.loader = false;
      }
    );
  }

  trackPage (index, page) {
    return page ? page.id : null;
  }

  getUrl(slug) {
    const ind = this.service.initPageDropDown.findIndex( f => f.slug === slug);
    if(ind > -1) {
      return slug
    }
    return 'page/' + slug;
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

  addNewPage() {
    this.edit = false;
    this.addNew = true;
    this.config = new PageContent();
    this.createComponent();
    this.openSidebar();
  }

  addContent() {
    this.edit = false;
    this.addNew = false;
    this.config = new PageContent();
    this.createComponent();
    this.openSidebar();
  }

  editContent(page) {
    this.config = new PageContent();
    this.edit = true;
    this.addNew = false;
    this.config = page;
    this.createComponent();
    this.openSidebar();
  }

  // ******************* Create Component *************************

  private createComponent() {
    const factory = this.resolver.resolveComponentFactory(AddFormComponent);
    this.pageComponent.clear();
    this.componentRef = this.pageComponent.createComponent(factory);
    this.componentRef.instance.config = this.config;
    this.componentRef.instance.pages = this.pages;
    this.componentRef.instance.edit = this.edit;
    this.componentRef.instance.addNew = this.addNew;
    this.componentRef.instance.submit.subscribe( e => this.allertShow(e));
  }

  allertShow(e) {
    if(e.message) {
      if (e.status) {
        this.getContentList();
        this.alert.success(this.alertContainer, e.message, true, 5000);
        this.executeAction();
      } else {
        this.alert.error(this.alertContainer, e.message, true, 5000);
      }
    }
  }

  //  ***************** Delete ********************

  deleteContent(id) {
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
          this.service.deletePage(id).then(res => {
            if (res.status === 'OK') {
              this.allertShow({ status: true, message: res.result.message });
            } else {
              this.allertShow({ status: false, message: res.result.error });
            }
          }).catch(err => {
            this.allertShow({ status: false, message: 'Something wrong!!! Please try again.' });
          });
        }
        this.deleteId = null;
      }, (res) => {
        console.log(res);
      });
  }

}
