import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { Subscription } from 'rxjs';
import { RegisterService } from '../register.service/register.service';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../../modules/alert/alert.service';
import { AdminService } from '../../../admin.service';
import { Stores } from '../../settings/models/settings.models';
import { GET_USER } from '../../../../globals/_classes/functions';
import { StoreInfo, RegisterList } from '../models/register-models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-register',
  templateUrl: './add-register.component.html',
  styleUrls: ['./add-register.component.css']
})
export class AddRegisterComponent implements OnInit, AfterViewInit {

  sidebarOpen: boolean = false;
  pagi: Pagi = new Pagi();
  loader: boolean;
  registerList: RegisterList[] = [];
  sub: Subscription[] = [];
  registerStore: StoreInfo = new StoreInfo();
  open: boolean;
  loctions = [];

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sidebarOpen) this.sidebarS.openSidebar();
  }

  constructor(
    private sidebarS: SidebarService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private alertS: AlertService,
    private adminS: AdminService,
    private registerS: RegisterService
  ) { 
    this.checkRoute();
    this.getTerminal();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.sub[1] = this.adminS.stores.subscribe(
      val => {
        if(val) {
          this.loctions = val;
        }
      }
    );
    this.sub[2] = this.adminS.user.subscribe(
      val => {
        this.formatRegister(GET_USER());
      }
    );
    this.sub[3] = this.registerS.sideBarOff.subscribe(
      val => {
        if(val && val.close) {
          // console.log(val);
          this.getRegisterList(1, 20);
          this.close();
          this.alertS.success(this.alertContainer, val.massage, true, 5000);
        }
      }
    );
  }

  ngAfterViewInit() {
    this.closeEdit();
  }

  ngOnDestroy() {
    for (let s of this.sub) {
      s.unsubscribe();
    }
    this.registerS.sideBarOff.next(null);
  }

  reloadTable(e) {
    this.getRegisterList(e.page, e.limit);
  }

  getRegisterList (p?, l?) {
    this.loader = true;
    this.registerS.getRegisters(p, l).subscribe(
      res => {
        // console.log(res);
        this.dataList(res);
        this.loader = false;
      },
      err => console.log(err)
    );
  }

  private dataList(res) {
    this.registerList = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page_no']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 20;
    this.checkClose();
  }
  

  checkClose() {
    this.open = false;
    for(let r of this.registerList) {
      if(!r.date_closed) {
        this.open = true;
        break;
      }
    }
  }

  getDate(d) {
    if(d) {
      return new Date(d);
    }
    return '';
  }

  getTerminal() {
    this.sub[0] = this.route.data.subscribe(
      res => {
        if(res.loc.status == 'OK') {
          this.loctions = res.loc.result.data;
          this.formatRegister(GET_USER());
        }
      }
    );
  }

  formatRegister(user) {
    this.registerStore = this.registerS.formatStore(this.loctions, user);
    // console.log(this.registerStore);
    this.registerS.storeInfo.next(this.registerStore);
    if(this.registerStore.store && this.registerStore.terminal) {
      this.getRegisterList(1, 20);
    }
  }

  trackRegister(index, reg) {
    return reg ? reg.id : null; 
  }

  private checkRoute() {
    const event = this.router.events;
    this.sub[0] = event.pipe(map((e) => {
      const open = this.router.createUrlTree(['open'], { relativeTo: this.route });
      const edit = this.router.createUrlTree(['edit'], { relativeTo: this.route });
      const close = this.router.createUrlTree(['close'], { relativeTo: this.route });
      return this.router.isActive(open, false) || this.router.isActive(edit, false) || this.router.isActive(close, false);
    })).subscribe(active => {
      if (active) {
        this.sidebarS.openSidebar();
      } else {
        this.sidebarS.removeSidebar();
      }
      this.sidebarOpen = active;
    });
  }

  editRegister(a, data) {
    // console.log(data);
    if(data) {
      sessionStorage.setItem('regEdit', JSON.stringify(data));
      this.openSidebar(a);
    } 
  }

  closeRegister(a, data) {
    if(data) {
      sessionStorage.setItem('regClose', JSON.stringify(data));
      this.openSidebar(a);
    } 
  }

  openRegister(a) {
    sessionStorage.setItem('regOpen', 'OPEN');
    this.openSidebar(a);
  }

  openSidebar(a) {
    this.sidebarS.openSidebar();
    this.router.navigate([a], { relativeTo: this.route });
  }

  private closeEdit() {
    $('.close-sidebar').click((e) => {
      e.preventDefault();
      this.close();
    });
    $('.close-sidebar-upper').click((e) => {
      e.preventDefault();
      this.close();
    });
  }

  private close() {
    this.sidebarOpen = false;
    this.sidebarS.removeSidebar();
    this.router.navigate(['admin/register']);
  }



}
