import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from '../../../../modules/alert/alert.service';
import { chcekPassowrd } from '../../../../globals/_classes/functions';
import { UserSignUp } from '../models/user.models';
import { PartnerUserService } from '../user.service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  password: string = '';
  loader: boolean;
  signUp: UserSignUp;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private alert: AlertService,
    private router: Router,
    private userS: PartnerUserService
  ) {
    this.signUp = new UserSignUp();
   }

  ngOnInit() {
  }

  checkPassword(pass,conf){
    return chcekPassowrd(pass,conf);
  }

  createAccount(f){
    this.signUp.user_type_id = parseInt(this.signUp.user_type_id);
    this.loader = true;
    this.userS.createUser(this.signUp)
    .then(
      res => {
        this.loader = false;
        f.form.reset();
        if(res.status=='OK') {
          this.alert.success(this.alertContainer, res.result.message, true, 3000);
          setTimeout(() => {
            this.router.navigateByUrl(`/partner/users`);
          }, 2000);      
        } else {
          this.alert.error(this.alertContainer, res.result.error, true, 3000);
        }
      },
      error => {
        console.log(error);
        this.alert.error(this.alertContainer, 'Something wrong!!! Please try again.', true, 3000);
        this.loader = false; 
    });
  }

}
