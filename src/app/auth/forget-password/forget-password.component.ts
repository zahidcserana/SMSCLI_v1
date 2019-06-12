import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from '../../modules/alert/alert.service';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { PreAuthService } from '../pre-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Helpers } from '../../helpers';
import { getSubdomain } from '../../globals/_classes/functions';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['../auth.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  loading = false;
  message: string;
  activated: boolean;
  queryParam;
  storeName: string;
  sendingEmail: boolean;
  email: string;

  @ViewChild('hasAlert') alertContainer: ElementRef;

  constructor(
    private _router: Router,
    private alert: AlertService,
    private route: ActivatedRoute,
    private auth: PreAuthService
    ) { 
      const name = getSubdomain();
      this.storeName = name.includes('localhost') || name.includes('sms') ? 'golf' : name;
    }

  ngOnInit() {
    Helpers.setLoading(false);
  }

  forgotPass(f) {
    this.loading = true;
    this.activated = true;
    this.auth.forgetPassword(f.value).subscribe(
        data => {
          this.loading = false;
          if (data.status === 'OK') {
            this.activated = data.result.activation;
            if(this.activated) {
              this.message = data.result.message;
              f.form.reset();
            } else {
              this.email = f.value.email;
              this.message = data.result.error ? data.result.error : data.result.message;
              this.loading = true;
            }
          } else {
            this.alert.error(this.alertContainer, data.result.error ? data.result.error : data.result.message, true, 5000);
          }
        },
        error => {
          this.loading = false;
          this.message = null;
          this.alert.error(this.alertContainer, 'Something went wrong!!! Please try again', true, 5000);
        });
  }

  resendEmail () {
    this.auth.sendActivation(this.storeName).subscribe(
      res => {
        if(res.status === 'OK') {
          this.message = res.result.message;
          this.loading = false;
        } else {
          this.alert.error(this.alertContainer, res.result.error ? res.result.error : res.result.message, true, 5000);
        }
      }, err => {
        this.alert.error(this.alertContainer, 'Something went wrong!!! Please try again', true, 5000);
      }
    );
  }

  cancel() {
    if(this.storeName) {
      this._router.navigate(['/auth/login']);
    } else {
      this._router.navigate(['/auth/partner-login']);
    }  
  }

  goToSmsRoute() {
    sessionStorage.setItem('smsEmail', this.email);
    this._router.navigateByUrl('/auth/sms-activation');
  }


}
