import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { user_image } from '../../../../globals/endPoint/config';
import { ActivatedRoute } from '@angular/router';
import { FORMAT_DATE_TIME_PRO } from '../../../../globals/_classes/functions';
import { AlertService } from '../../../../modules/alert/alert.service';
import { Subscription } from 'rxjs';
import { PartnerUserProfileService } from '../user-profile.service/user-profile.service';


class USER {
  image: string;
  status: number;
  email: string;
  first_name: string;
  last_name: string;
  store_id: number;
  user_id: number;
  user_type_id: number;
  social_type: any;
  created: any;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  image_url:string = null;
  user_id:number;
  user: USER = new USER;
  loader:boolean;
  sub: Subscription[] = [];

  @ViewChild('hasAlert') alertContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private userS: PartnerUserProfileService,
    private alertS: AlertService
  ) {
    this.sub[0] = this.userS.user_image.subscribe(image=>{
      if(image)
        this.image_url = user_image + image;
    });

    this.sub[1] = this.userS.user_status.subscribe(st=>{
      if(st)
        this.user['status'] = st;
    });

    this.user_id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.getBasicInfo();
  }

  ngOnDestroy() {
    for(let s of this.sub) {
      s.unsubscribe();
    }
  }

  getBasicInfo(){ 
    this.userS.getuserBasicInfo(this.user_id).subscribe(
      response=>{
        this.user = response.data;
        if(this.user.image)
          this.image_url = user_image + this.user.image;

        sessionStorage.setItem('user_email', this.user.email);
      },
      error=> console.log(error)
    );
  }

  findUserType(type){
    return this.userS.findUserType(type);
  }

  checkStatus(state){
    return this.userS.checkStatus(state);
  }

  dateFormat(date){
    return FORMAT_DATE_TIME_PRO(date);
  }

  resendPassword(data){
    this.loader = true;
    // console.log(data)
    this.userS.resendPassword({email:data}).then(
      res=>{
        // console.log(res);
        this.loader = false;
        this.alertS.success(this.alertContainer, res.result.message, true, 5000);
      },
      err=>{
        console.log(err);
        this.loader = false;
        this.alertS.error(this.alertContainer, err.error.result.error, true, 5000);
      }
    );
  }

  
}
