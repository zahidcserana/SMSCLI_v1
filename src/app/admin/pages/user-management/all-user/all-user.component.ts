import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { User, UserSignUp } from '../models/user.models';
import { ActivatedRoute, Router } from '@angular/router';
import { user_image } from '../../../../globals/endPoint/config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { FORMAT_DATE_TIME, calculatePage } from '../../../../globals/_classes/functions';
import { UserService } from '../user.service/user.service';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { AlertService } from '../../../../modules/alert/alert.service';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { Helpers } from '../../../../helpers';



@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit, AfterViewInit {

  userList:User[] =  [];
  image_url = user_image;
  pagi:Pagi = new Pagi();
  filter:string = '';
  loader: boolean;
  sideBaropen: boolean;
  signUp: UserSignUp;


  @ViewChild('hasAlert') alertContainer: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.sideBaropen) {
      $('.native-routing').css('display', 'block');
      this.sidebarS.openSidebar();
    }
  }

  constructor(
    private route:ActivatedRoute,
    private modalService: NgbModal,
    private userS:UserService,
    private alertS: AlertService,
    private sidebarS: SidebarService,
    private router: Router
  ) { 
    this.signUp = new UserSignUp();
  }

  ngOnInit() {
    // console.log(this.route.snapshot.data['user_list']);
    let response = this.route.snapshot.data['user_list'];
    this.dataList(response);
  }

  ngAfterViewInit(){
    window.scrollTo(0,0);
    this.closeSidebar();
    this.executeAction();
  }

  tarckUser(index, user) {
    return user  ? user.id : null;
  }

  reloadTable(e){
    // console.log(e)
    this.getUserList(e.page,e.limit,this.filter);
  }

  getUserList(p,l,f){
    this.loader = true;
    this.renderData(p,l,f);
  }

  renderData(p,l,f){
    this.userS.getUserList(p,l,f).subscribe(
      res =>{
        // console.log(res);
        this.dataList(res);
        this.loader = false;
      },
      err=> console.log(err)
    );
  }

  private dataList(res){
    this.userList = res.data['users'];
    this.pagi.total = res.data['total'] || 0;
    this.pagi.page = parseInt(res.data['page_no']) || 1;
    this.pagi.limit = parseInt(res.data['limit']) || 10;
  }

  filterList(e){
    this.filter = e;
    this.getUserList(1,10,this.filter);
  }

  findUserType(type){
    return this.userS.findUserType(type);
  }

  checkStatus(state){
    return this.userS.checkStatus(state);
  }

  dateFormat(date){
    return FORMAT_DATE_TIME(date);
  }

  archiveUserList(id,i){
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      size:'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result)=>{
      if(result) {
        Helpers.setLoading(true);
        this.userS.deleteUser(id).then((res)=>{
          this.loadTable();
          // console.log(res);
          Helpers.setLoading(false);
          this.alertS.success(this.alertContainer, res.result.message, true, 5000);
          this.userList.splice(i,1);
        }),
        err => {
          console.log(err);
          Helpers.setLoading(false);
          this.alertS.error(this.alertContainer, err.error.result.error, true, 5000);
        }
      }
    }, (reason) => {
      console.log(reason);
    });

  }

  loadTable() {
    let d = calculatePage(this.pagi.page, this.pagi.limit, this.pagi.total);
    // console.log(d);
    if(d.change) {
      this.renderData(d.page, d.limit, this.filter);
    } else {
      this.pagi.total--;
    }
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

  creatnewUser() {
    $('.native-routing').css('display', 'block');
    this.sidebarS.openSidebar();
    this.signUp = new UserSignUp();
    this.sideBaropen = true;
  }

  submitUser(e) {
    if(e.off) {
      if(e.success) {
        this.renderData(this.pagi.page, this.pagi.limit, this.filter);
        this.alertS.success(this.alertContainer, e.msg, true, 5000);
        this.executeAction();
        this.router.navigate([`/admin/user/${e.userId}/account-settings`])
      } else {
        this.alertS.error(this.alertContainer, e.msg, true, 5000);
      }
    }
  }

}
