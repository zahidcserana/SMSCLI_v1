import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../modules/alert/alert.service';
import { PreAuthService } from '../pre-auth.service';
import { chcekPassowrd } from '../../globals/_classes/functions';
import { Helpers } from '../../helpers';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../auth.component.css']
})
export class ResetPasswordComponent implements OnInit {

  showPass:boolean = false;
  password:string;
  newPass:string= '';
  loader:boolean = true;
  send:boolean;
  key:string;
  failed: boolean;
  message: string;

  @ViewChild('hasAlert') alertContainer: ElementRef;

  constructor(
    private router: Router,
    private alert: AlertService,
    private route:ActivatedRoute,
    private auth: PreAuthService
  ) {
    this.key = this.route.snapshot.params.key;
    this.checkActivation();
   }

  ngOnInit() {
    Helpers.setLoading(false);
  }

  checkActivation(){
    this.auth.resetPasswordActivation(this.key).subscribe(
      res =>{
        this.loader = false;
        // console.log(res);
        if(res.status == 'OK') {
          this.failed = false;
          this.alert.success(this.alertContainer, res.result.message, true, 3000);
        } else {
          this.failed = true;
          this.message = res.result.error;
        }
      },
      err =>{
        this.loader = false;
        this.failed = true;
        this.message = 'Something worng!!! Please try again';
        console.log(err);
      }
    );
  }

  checkPassword(pass,conf){
    if(pass && conf)
      return chcekPassowrd(pass,conf);
    return true;
  }

  showPassword(){
    if(this.newPass!='')
      this.showPass = !this.showPass;
  }

  submitPass(f){
    this.send = true;
    let sendPass = {password:this.password};
    // console.log(sendPass);
    this.auth.resetPassword(this.key,sendPass).subscribe(
      res =>{
        if(res.status == 'OK') {
          this.send = false;
          // console.log(res);
          this.alert.success(this.alertContainer, res.result.message, true, 3000);
          f.form.reset();
          setTimeout(() => this.router.navigate(['/auth/login']) ,3000);
        } else {
          this.error(res);
        }
      },
      err => this.error(err)
    );
  }

  error(err) {
    this.send = false;
    console.log(err);
    this.alert.error(this.alertContainer, err.result.error, true, 5000);
  }

}
