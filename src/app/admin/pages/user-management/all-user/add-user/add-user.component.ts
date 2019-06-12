import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserSignUp } from '../../models/user.models';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { chcekPassowrd } from '../../../../../globals/_classes/functions';
import { UserService } from '../../user.service/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  
  password:string = '';
  loader:boolean;

  @Input('signUp') signUp:UserSignUp;
  @Output('submit') submit: EventEmitter<any> = new EventEmitter();

  constructor(
    private alert: AlertService,
    private userS: UserService
  ) {
      
   }

  ngOnInit() {
  }


  checkPassword(pass,conf){
    return chcekPassowrd(pass,conf);
  }

  createAccount(f){
    this.loader = true;
    this.signUp.user_type_id = parseInt(this.signUp.user_type_id);
    console.log(this.signUp);
    this.userS.register(this.signUp).then(
      data => {
        // console.log(data);
        f.form.reset();
        this.submit.emit({off: true, success: true, msg: 'New user has been created successfully', userId: data.result.user.id});
        this.loader = false;
      },
      error => {
        console.log(error);
        if(error.error.result.error.email) {
          this.submit.emit({off: true, success: false, msg: error.error.result.error.email});
        } else {
          this.submit.emit({off: true, success: false, msg: error.error.result.error});
        }
        this.loader = false; 
    });
  }

}
