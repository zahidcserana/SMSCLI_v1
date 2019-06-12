import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {AccountReport, Accounts} from "../models/settings.models";
import {AlertService} from "../../../../modules/alert/alert.service";
import {SettingService} from "../setting-service/setting.service";
import {SidebarService} from "../../sidebar-service/sidebar.service";
import {AdminService} from "../../../admin.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Helpers} from "../../../../helpers";
import {Pagi} from "../../../../modules/pagination/pagi.model";
import {DialogBoxComponent} from "../../../../modules/dialog-box/dialog-box.component";

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    filter: string;
    accounts: Accounts[] = [];
    account: Accounts = new Accounts();
    accountReport: AccountReport = new AccountReport();
    sideBaropen: boolean;
    sideBarName: string = null;
    loader: boolean;
    pagi: Pagi = new Pagi();
    status = [];
    type = [];
    loaderExport: boolean;

    @ViewChild('hasCusAlert') alertContainer: ElementRef;
    @HostListener('window:resize', ['$event'])

    onResize(event) {
        if (this.sideBaropen) {
            $('.native-routing').css('display', 'block');
            this.sidebarS.openSidebar();
        }
    }

    constructor(private sidebarS: SidebarService,
                private settingS: SettingService,
                private alertS: AlertService,
                private adminS: AdminService,
                private modalService: NgbModal) {
        this.filter = this.filter ? this.filter : '';
        this.pagi.limit = this.pagi.limit ? this.pagi.limit : 20;
        this.pagi.page = this.pagi.page ? this.pagi.page : 1;
        // this.pagi.page = val.get('page') ? parseInt(val.get('page')) : this.pagi.page;
        // this.pagi.limit = val.get('limit') ? parseInt(val.get('limit')) : this.pagi.limit;
    }

    ngOnInit() {
        this.getAccounts(this.pagi.page, this.pagi.limit, this.filter);
    }

    filterList(e){
        this.filter = e;
        this.getAccounts(1, 20, this.filter);
    }

    addAccount() {
        this.account = new Accounts();
        this.openSidebar();
        this.sideBarName = 'add';
    }
    getDate(d) {
        if(d) {
            return new Date(d);
        }
        return '';
    }
    editAccount(ter) {
        this.account = new Accounts();
        this.settingS.addEditChange({open: true, edit: true});
        this.account = Object.assign({}, ter);
        this.openSidebar();
        this.sideBarName = 'add';
    }

    openSidebar() {
        $('.native-routing').css('display', 'block');
        this.sidebarS.openSidebar();
        this.sideBaropen = true;
    }

    reloadTable(e) {
        this.getAccounts(e.page, e.limit, e.filter);
    }

    ngAfterViewInit() {
        window.scrollTo(0, 0);
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

    deleteAccount(id) {
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
                    this.archiveAccount(id);
                }
            }, (res) => {
                console.log(res);
            });

    }
    archiveAccount(id) {
        this.settingS.deleteAccount(id).then(
            res => {
                this.loader = true;
                //this.getAccounts(this.pagi.page, this.pagi.limit, this.filter);
                this.dataRender(this.pagi.page, this.pagi.limit);
                this.alert({error: false, message: 'Account has been deleted'});
            }
        ).catch (
            err => {
                console.log(err);
                this.alert({error: true, message: 'Something wrong! Account has been not deleted'});
            }
        )
    }

    getAccounts(p, l, q) {
        this.loader = true;
        this.settingS.getAccounts(p, l, q).pipe(map(res => {
            return res.result;
        }), catchError(err => {
            this.loader = false;
            return of([]);
        })).subscribe(res => {
            this.loader = false;
            this.accounts = res.data;
            this.dataList(res);
            this.accountReport = res.account;
            console.log(res);
        });
        this.executeAction();
    }

    submitAccount(event) {
        console.log(event);
        if (!event.alert.error) {
            /*if (event.add) {
                this.pagi.total++;
                if (this.pagi.page == 1) {
                    const size = this.accounts.length;
                    if (size === 10) {
                        this.accounts.splice(9, 1);
                        this.accounts.splice(0, 0, event.data);
                    } else {
                        this.accounts.splice(0, 0, event.data);
                    }
                } else {
                    this.dataRender(this.pagi.page, this.pagi.limit, this.filter);
                }
            } else {
                let index = this.accounts.findIndex((c) => {
                    return event.data.id == c.id;
                });
                if (index > -1) {
                    this.accounts[index] = event.data;
                }
            }*/
            this.dataRender(this.pagi.page, this.pagi.limit, this.filter);
            this.executeAction();
        }
        this.alert(event.alert);
    }

    private dataRender(p?, l?, q?) {
        this.settingS.getAccounts(p, l, q).subscribe(
            res => {
                this.dataList(res.result);
                this.loader = false;
            },
            err => console.log(err)
        );
    }

    private dataList(res) {
        this.accounts = res.data;
        this.accountReport = res.account;
        this.pagi.total = res['total'] || 0;
        this.pagi.page = parseInt(res['page_no']) || 1;
        this.pagi.limit = parseInt(res['limit']) || 20;
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
}
