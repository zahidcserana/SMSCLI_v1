import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../../../modules/alert/alert.service';
import { User } from '../../../models/user.models';
import { PartnerUserService } from '../../../user.service/user.service';



@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  
  user: User = new User();
  user_id:number;
  loader:boolean;


  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private alertS: AlertService,
    private userS: PartnerUserService,
  ) {
      
   }

  ngOnInit() {
    this.user_id = +this.route.parent.parent.parent.snapshot.paramMap.get('user_id');
    const data = this.route.snapshot.data['user'];
    this.user = data ? data.data : new User();
  }

  updateUserInfo(){
    this.loader = true;
    this.userS.updateUserInfo(this.user_id,this.user)
      .then(
        res=>{
          this.loader = false;
          if(res.status=='OK') {
            this.alertS.success(this.alertContainer, res.result.message, true, 3000);     
          } else {
            this.alertS.error(this.alertContainer, res.result.error, true, 3000);
          }
        },
        err=>{
          this.loader = false;
          console.log(err);
          this.alertS.error(this.alertContainer, 'Something wrong!!! Please try again.', true,5000);
        }
      );
  }


}
