import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndPoint } from '../../../../../globals/endPoint/config';
import { changeUser, GET_USER } from '../../../../../globals/_classes/functions';
import { CompanyService } from '../../../../company.service';
import { PartnerUserProfileService } from '../../user-profile.service/user-profile.service';
import { UserProfilelogin } from '../../models/user-profile.models';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {

  previewInage: string;
  user_id: number;
  url: string;
  user: UserProfilelogin;

  constructor(
    private route: ActivatedRoute,
    private userS: PartnerUserProfileService,
    private comapnyS: CompanyService
  ) { 
    this.user_id = this.route.parent.parent.parent.snapshot.params.user_id;
    this.url = EndPoint + 'users/avatar/'+ this.user_id;
  }

  ngOnInit() {
    this.user = GET_USER(); 
  }

  uploadAvatar(data){
    console.log(data);
    this.userS.changeImage(data.status.result.data);
    if(this.user_id == this.user.user_id){
      changeUser('image', data.status.result.data);
      let user = GET_USER();
      this.comapnyS.changeUser.next(user);
    }
  }



}
