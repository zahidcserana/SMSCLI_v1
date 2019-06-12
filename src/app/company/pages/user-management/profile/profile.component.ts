import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models/user.models';
import { PartnerUserService } from '../user.service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { calandarDateFormat } from '../../../../globals/_classes/functions';
import { Subscription } from 'rxjs';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../../modules/alert/alert.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  image_url:string = null;
  user_id:number;
  user: User = new User();
  loader:boolean;
  sub: Subscription[] = [];
  deleteText: string;
  deleteLoad: boolean;

  @ViewChild('hasAlert') alertContainer: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private alertS: AlertService,
    private userS: PartnerUserService
  ) {
    this.user_id = +this.route.snapshot.paramMap.get('user_id');
    // console.log(this.user_id);
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.userS.getuserProfileInfo(this.user_id).subscribe(
      res => {
        this.user = res.data;
        this.deleteText = this.user.status !== 3 ? 'Delete User' : 'Permanently Delete User';
      },
      err => {
        this.user = new User();
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    for(let s of this.sub) {
      s.unsubscribe();
    }
  }

  getPlanePeriod(user: User) {
    return this.userS.formatPlanPeriod(user);
  }

  findUserType(type){
    return this.userS.findUserType(type);
  }

  checkStatus(state){
    return this.userS.checkStatus(state);
  }

  dateFormat(date){
    return calandarDateFormat(date);
  }

  dialogBox() {
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = this.user.status !== 3 ? 'Do you want to delete this user?' : 'Do you realy want to delete this user? This user related informations, stores will be deleted with the delete process.';
    modalRef.result
    .then((result)=>{
      if(result){
        this.deleteLoad = true;
        const sendData = {
          user_id: this.user.id, 
          status: this.user.status === 3 ? 4 : 3
        }
        this.userS.changeUserStatus(sendData)
        .then(
          res => {
            this.deleteLoad = false;
            if(res.status === "OK") {
              this.user.status =  sendData.status;
              if(this.user.status === 4) {
                this.router.navigateByUrl('partner/users');
              } else {
                this.deleteText = 'Permanently Delete User';
              }
              this.alertS.success(this.alertContainer, res.result.message, true, 3000);
            } else {
              this.alertS.error(this.alertContainer, res.result.error, true, 3000);
            }
          }
        )
        .catch(
          err => {
            this.deleteLoad = false;
            this.alertS.error(this.alertContainer, 'Something went wrong!!! Please try again.', true, 3000);
          }
        )
      }
    },(res)=>{
      console.log(res);
    });
  }

  
}
