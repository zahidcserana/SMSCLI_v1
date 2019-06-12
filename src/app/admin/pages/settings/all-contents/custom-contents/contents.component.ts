import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { SidebarService } from '../../../sidebar-service/sidebar.service';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { Helpers } from '../../../../../helpers';
import { Content } from '../../models/contents.model';
import { ContentService } from '../../setting-service/contents.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit, AfterViewInit {

  loader: boolean;
  contents: Content[] = [];
  sideBaropen: boolean;
  deleteId: boolean;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBaropen) {
      $('.native-routing').css('display', 'block');
      this.sidebarS.openSidebar();
    }
  }

  constructor(
    private alert: AlertService,
    private contentService: ContentService,
    private sidebarS: SidebarService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getContents();
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.closeSidebar();
    this.executeAction();
  }

  trackContent(index, content) {
    return content.id ? content.id : null;
  }

  editContent(data: Content) {
    this.contentService.editForm.next({edit: true, data: data});
    this.openSidebar();
  }
  addContent() {
    this.contentService.editForm.next({edit: false, data: {}});
    this.openSidebar();
  }

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

  executeAction() {
    this.sideBaropen = false;
    this.sidebarS.removeSidebar();
    $('.native-routing').css('display', 'none');
    this.contentService.editForm.next({edit: false, data: {}});
  }

  allertShow(e) {
    if('message' in e) {
      console.log(e);
      if (e.status) {
        this.getContents();
        this.alert.success(this.alertContainer, e.message, true, 5000);
        this.executeAction();
      } else {
        this.alert.error(this.alertContainer, e.message, true, 5000);
      }
    }
  }

  getContents() {
    this.loader = true;
    this.contentService.getContents('custom').subscribe(res => {
      this.loader = false;
      this.contents = res;
    });
    this.executeAction();
  }

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
          this.contentService.deleteContent(id).then(res => {
            if (res.status === 'OK') {
              this.allertShow({ status: true, message: res.result.message });
            } else {
              this.allertShow({ status: false, message: res.result.error });
            }
          }).catch(err => {
            this.allertShow({ status: false, message: 'Something wrong!!! Please try again.' });
          });
        }
      }, (res) => {
        console.log(res);
      });

  }
}
