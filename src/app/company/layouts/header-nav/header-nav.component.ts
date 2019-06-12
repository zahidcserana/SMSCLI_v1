import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Helpers } from '../../../helpers';
import { user_image } from '../../../globals/endPoint/config';
import { GET_USER } from '../../../globals/_classes/functions';
import { User_login } from '../../../admin/pages/user-management/models/user.models';
import { CompanyService } from '../../company.service';


declare let mLayout: any;

@Component({
selector: "app-header-nav",
templateUrl: "./header-nav.component.html",
encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

image_url:string;
user:User_login;


@ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(private comapnyS: CompanyService) {
    this.userChange();
  }

  ngOnInit()  {
    this.image_url = user_image + this.user.image;
  }
  ngAfterViewInit()  {
      mLayout.initHeader();
  }

  checkImage(){
    if(this.user && this.user.image) return true;
    return false;
  }

  userChange(){
    this.comapnyS.changeUser.subscribe(user=>{
      this.user = user;
      this.image_url = user_image + this.user.image;
    });
  }




}