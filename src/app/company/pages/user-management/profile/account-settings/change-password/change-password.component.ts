import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { chcekPassowrd } from '../../../../../../globals/_classes/functions';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../../../modules/alert/alert.service';
import { PartnerUserService } from '../../../user.service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  newPass = {
    password:''
  }
  user_id:number;
  showPass:boolean = false;
  loader:boolean = false;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private userS: PartnerUserService,
    private route: ActivatedRoute,
    private alertS: AlertService
  ) {
    this.user_id = this.route.parent.parent.parent.snapshot.params.user_id;
   }

  ngOnInit() {
    this.newPass.password = '';
  }

  showPassword(){
    this.showPass = !this.showPass;
  }

  submitPass(f){
    this.loader = true;
    // console.log(this.newPass);
    this.userS.changePassword(this.user_id,this.newPass).then(
      res =>{
        this.loader = false;
        // console.log(res);
        f.form.reset();
        this.alertS.success(this.alertContainer,"Password has been changed successfully.",true, 5000);
      },  
      err=> this.error(err)
    );
  }

  sendChangePass(){
    this.loader = true;
    let email = sessionStorage.getItem('user_email');
    // console.log(email)
    this.userS.resendPassword({email:email}).then(
      res=>{
        this.loader = false;
        // console.log(res);
        this.alertS.success(this.alertContainer, res.result.message, true, 5000);
      },
      err=> this.error(err)
    );
  }

  error(err){
    console.log(err);
    this.loader = false
    this.alertS.error(this.alertContainer, err.error.result.error, true, 5000);
  }

  

  

}
