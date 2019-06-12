import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndPoint } from '../../../../../../globals/endPoint/config';
import { changeUser, GET_USER } from '../../../../../../globals/_classes/functions';
import { CompanyService } from '../../../../../company.service';
import { User_login } from '../../../models/user.models';
import { PartnerUserService } from '../../../user.service/user.service';



@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {

  previewInage: string;
  user_id: number;
  url: string;
  user: User_login;

  constructor(
    private route: ActivatedRoute,
    private userS: PartnerUserService,
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
  }



}
