import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../modules/alert/alert.service';
import { PreAuthService } from '../pre-auth.service';
import { Helpers } from '../../helpers';
import { chcekPassowrd } from '../../globals/_classes/functions';
import { Subscription } from 'rxjs';
import { storeHoshName } from '../../globals/endPoint/config';

class SignUp {
  store_name: string;
  slug: string;
  first_name:string;
  last_name: string;
  email:string;
  password:string;
  user_type_id: number;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  model: SignUp = new SignUp();
  loading = false;
  password: string = '';
  domain = storeHoshName;
  unique: boolean;
  checking: boolean;
  duplicate: boolean;
  successMessage: string;
  condition: boolean = true;

  @ViewChild('hasAlert') alertContainer: ElementRef;



  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private alert: AlertService,
      private auth: PreAuthService
    ) {
      
  }

  ngOnInit() {
      Helpers.setLoading(false);
  }

  ngOnDestroy() {
    
  }

  checkStoreName() {
    this.checking = true;
    this.auth.checkStore({slug: this.model.slug, register: true})
      .then(
        res => {
          // console.log(res);
          this.checking = false;
          if(res.status == 'OK' && res.result.data.status==0) {
            this.model.store_name = res.result.data.store_name;
            this.unique = true;
            this.duplicate = false;
          } else {
            this.model.store_name = null;
            this.unique = false;
            this.duplicate = true;
          }
        },
        err => this.errorCheck(err)
      ).catch (
        err => {
          this.errorCheck(err);
        }
      )
  }

  private errorCheck(err) {
    this.model.store_name = null;
    this.checking = false;
    this.unique = false;
    this.duplicate = false;
    console.log(err);
  }

  checkPassword(pass,conf){
    return chcekPassowrd(pass,conf);
  }

  createAccount(f){
    this.successMessage = null;
    this.loading = true;
    this.model.user_type_id = 3;
    console.log(this.model);
    this.auth.register(this.model).then(
      data => {
        console.log(data);
        if(data.status == 'OK') {
          this.successMessage = data.result.message;
        } else {
          this.alert.error(this.alertContainer, data.result.error, true, 5000);
        }
        this.loading = false;
      }).catch(
      error => {
        console.log(error);
        this.loading = false;
        this.alert.error(this.alertContainer, this.auth.getErrorMessage(error), true, 5000);
    });
  }

  goToSmsRoute() {
    sessionStorage.setItem('smsEmail', this.model.email);
    this._router.navigateByUrl('/auth/sms-activation');
  }

}
