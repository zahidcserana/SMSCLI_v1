import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { Stores } from '../models/settings.models';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { SettingService } from '../setting-service/setting.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { Helpers } from '../../../../helpers';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-bolt-terminal',
  templateUrl: './bolt-terminal.component.html',
  styleUrls: ['./bolt-terminal.component.css']
})
export class BoltTerminalComponent implements OnInit, AfterContentInit {

  terminals: Stores[] = [];
  terminal: Stores = new Stores();
  edit: boolean;
  sideBaropen: boolean;
  sideBarName: string = null;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBaropen) {
      this.openSidebar();
    }
  }

  constructor(
    private sidebarS: SidebarService,
    private settingS: SettingService,
    private alertS: AlertService,
    private adminS: AdminService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getTerminal();
  }

  ngAfterContentInit() {
    this.closeSidebar();
    this.executeAction();
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

  openSidebar() {
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
    this.sideBaropen = true;
  }

  trackTerminal(index, co) {
    return co ? co.id : null;
  }

  getTerminal() {
    this.settingS.getClasses()
    .subscribe(
      res => {
        // console.log(res);
        this.terminals = res.data;
        if(this.terminals) {
          this.adminS.changeStore(this.terminals);
        }
      },
      err => {
        this.terminals = [];
        console.log(err);
        this.alert({error: true, message: 'Something wrong!!! Please try again.'});
      }
    )
  }

  addTerminal() {
    this.terminal = new Stores();
    this.edit = false;
    this.openSidebar();
    this.sideBarName = 'add';
  }

  editTerminal(ter) {
    this.terminal = new Stores();
    this.terminal = Object.assign({}, ter);
    this.edit = true;
    this.openSidebar();
    this.sideBarName = 'add';
  }

  submitTerminal(event) {
    // console.log(event);
    if(!event.error) {
      this.getTerminal();
      this.executeAction();
    }
    this.alert(event);
  }

  deleteTerminal(id) {
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
          this.archiveTerminal(id);
        }
      }, (res) => {
        console.log(res);
    });
  }

  archiveTerminal(id) {
    this.settingS.deleteClass(id).then(
      res => {
        this.getTerminal();
        this.alert({error: false, message: 'The store has been deleted'});
      }
    ).catch (
      err => {
        console.log(err);
        this.alert({error: true, message: 'Something wrong! Terminal has been not deleted'});
      }
    )
  }

  alert(data) {
    Helpers.setLoading(false);
    if (data.error) {
      this.alertS.error(this.alertContainer, data.message, true, 5000);
    } else {
      this.alertS.success(this.alertContainer, data.message, true, 5000);
    }
  }

  viewTerminal(ter) {
    this.terminal = new Stores();
    this.terminal = Object.assign({}, ter);
    this.openSidebar();
    this.sideBarName = 'view';
  }

}
