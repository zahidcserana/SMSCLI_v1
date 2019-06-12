import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { User } from '../models/user.models';
import { Router } from '@angular/router';
import { user_image } from '../../../../globals/endPoint/config';
import { calandarDateFormat, calculatePage } from '../../../../globals/_classes/functions';
import { PartnerUserService } from '../user.service/user.service';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { AlertService } from '../../../../modules/alert/alert.service';



@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit, AfterViewInit {

  userList: User[] = [];
  image_url = user_image;
  pagi: Pagi = new Pagi();
  filter: string = '';
  loader: boolean;
  statusId: number = null;
  sorting: string = '';
  orderBy: string;
  order: string;

  @ViewChild('hasAlert') alertContainer: ElementRef;


  constructor(
    private alertS: AlertService,
    private userS: PartnerUserService,
    private router: Router
  ) {
    this.pagi.page = 1;
    this.pagi.limit = 20;
  }

  ngOnInit() {
    this.getUserList();
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  getPlanePeriod(user: User) {
    return this.userS.formatPlanPeriod(user);
  }

  creatnewUser() {
    this.router.navigateByUrl('/partner/users/add-user');
  }

  tarckUser(index, user) {
    return user ? user.id : null;
  }

  reloadTable(e) {
    this.pagi.page = e.page;
    this.pagi.limit = e.limit;
    this.getUserList();
  }

  getUserList() {
    this.loader = true;
    this.renderData();
  }

  renderData() {
    this.userS.getUserList(this.pagi.page, this.pagi.limit, this.filter, this.sorting).subscribe(
      res => {
        this.dataList(res);
        this.loader = false;
      },
      err => {
        this.loader = false;
        console.log(err)
      }
    );
  }

  private dataList(res) {
    this.userList = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page_no']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 20;
  }

  sortingData(name: string) {
    const hasName = this.sorting.includes(name);
    this.orderBy = name;
    if(hasName) {
      this.order = this.sorting.includes('ASC') ? 'DESC' : 'ASC';
      this.sorting = `&order_by=${name}&order=${this.order}`;
    } else {
      this.sorting = `&order_by=${name}&order=ASC`;
      this.order = 'ASC';
    }
    this.getUserList();
  }

  filterList(e) {
    this.filter = e;
    this.getUserList();
  }

  findUserType(type) {
    return this.userS.findUserType(type);
  }

  checkStatus(state) {
    return this.userS.checkStatus(state);
  }

  dateFormat(date) {
    return calandarDateFormat(date);
  }

  changeStatus(user) {
    this.statusId = user.id;
    const sendData = {
      user_id: user.id,
      status: user.status === 1 ? 2 : 1
    }
    this.userS.changeUserStatus(sendData)
    .then(
      res => {
        this.statusId = null;
        if(res.status === "OK") {
          user.status = sendData.status;
          this.alertS.success(this.alertContainer, res.result.message, true, 3000);
        } else {
          this.alertS.error(this.alertContainer, res.result.error, true, 3000);
        }
      }
    )
    .catch(
      err => {
        this.statusId = null;
        this.alertS.error(this.alertContainer, 'Something went wrong!!! Please try again.', true, 3000);
      }
    );
  }

}
