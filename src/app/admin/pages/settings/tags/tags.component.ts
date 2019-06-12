import { Component, OnInit, HostListener, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { TagService } from './tag.setvice';
import { Tag } from '../models/settings.models';
import { AlertService } from '../../../../modules/alert/alert.service';
import { SettingService } from '../setting-service/setting.service';
import { ActivatedRoute } from '@angular/router';
import { Helpers } from '../../../../helpers';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, AfterViewInit {

  tagsList: Tag[] = [];
  sideBaropen: boolean;
  tag: Tag;
  EditMode: boolean;
  copyDone: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBaropen) {
      $('.native-routing').css('display', 'block');
      this.sidebarS.openSidebar();
    }
  }

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private tagService: TagService,
    private sidebarS: SidebarService,
    private settingS: SettingService,
    private alertS: AlertService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    const list = this.activeRoute.snapshot.data['list'];
    if (list) {
      this.tagsList = list.data;
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.closeSidebar();
    this.executeAction();
  }

  trackTag(index, tag) {
    return tag ? tag.id : null;
  }

  editTag(tag) {
    this.openSidebar();
    this.EditMode = true;
    this.tag = tag;
    this.tagService.tagReload.next({ reload: false, editMode: true, tag: tag });
  }

    AddTag() {
    this.openSidebar();
    this.tag = null;
    this.EditMode = false;
    this.tagService.tagReload.next({ reload: true, editMode: false});
  }

  openSidebar() {
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
    this.sideBaropen = true;
  }

  deleteTag(id, i) {
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
          this.archivetag(id, i);
        }
      }, (res) => {
        console.log(res);
      });

  }

  archivetag(id, i) {
    this.settingS.deleteTag(id).then(
      res => {
        this.tagsList.splice(i, 1);
        this.alert({error: false, message: 'Tag has been deleted'});
      }
    ).catch (
      err => {
        console.log(err);
        this.alert({error: true, message: 'Something wrong! Tag has been not deleted'});
      }
    )
  }

  SubmitTag(event) {
    if(!event.alert.error) {
      if (this.EditMode) {
        this.tag.name = event.data.name;
        this.tag.is_shown_in_nav = event.data.is_shown_in_nav;
      } else {
        this.tagsList.push(event.data);
      }
      this.executeAction();
    }
    // console.log(event);
    this.alert(event.alert);
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

  alert(data) {
    Helpers.setLoading(false);
    if (data.error) {
      this.alertS.error(this.alertContainer, data.message, true, 5000);
    } else {
      this.alertS.success(this.alertContainer, data.message, true, 5000);
    }
  }

  copyUrl(copyText) {
    copyText.select();
    document.execCommand('copy');
    this.copyDone = true;
    setTimeout(() => {
      this.copyDone = false;
    }, 2000);
  }


}
