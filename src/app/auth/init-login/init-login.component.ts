import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PreAuthService } from "../pre-auth.service";
import { Helpers } from "../../helpers";
import { domainName } from "../../globals/endPoint/config";
import { AlertService } from "../../modules/alert/alert.service";
import { encrypt, eLogin } from "../../globals/_classes/functions";


@Component({
  selector: "app-init-login",
  templateUrl: "./init-login.component.html",
  styleUrls: ["../auth.component.css"]
})
export class InitLoginComponent implements OnInit {

  signInModel: any = {
    email: "",
    password: ""
  };
  stores = [];
  loading = false;
  authanticateUser: boolean;
  currentStroe = {
    name: '',
    slug: '',
    id: 0
  };
  carte: boolean;

  @ViewChild("hasAlert") alertContainer: ElementRef;

  constructor(private alertS: AlertService, private auth: PreAuthService) {}

  ngOnInit() {
    Helpers.setLoading(false);
  }

  getDomain(name) {
    return domainName(name, 'store');
  }

  get length () {
    return this.stores.length > 1;
  }

  authanticate() {
    this.loading = true;
    this.auth.authenticate(this.signInModel).subscribe(
      data => {
        if (data.status == "OK") {
          this.authanticateUser = true;
          this.stores = this.swapName(data.result.data);
          if(this.stores[0]) {
            this.currentStroe = this.stores[0];
          }
          this.loading = false;
        } else {
          this.alertS.error(this.alertContainer, data.result.error, true, 5000);
          this.loading = false;
          this.authanticateUser = false;
        }
      },
      error => {
        console.log(error.result.error);
        this.alertS.error(
          this.alertContainer,
          this.auth.getErrorMessage(error),
          true,
          5000
        );
        this.loading = false;
        this.authanticateUser = false;
      }
    );
  }

  private swapName(data) {
    if(data) {
      return data.map( m => {
        const n = m['slug'];
        m['slug'] = m['name'];
        m['name'] = n;
        return m;
      });
    }
    return [];
  }


  signIn(data) {
    this.currentStroe = data;
    if(!this.currentStroe.slug) return;
    this.carte = !this.carte;

    this.loading = true;
    const sendData = {
      ...this.signInModel,
      store_name: this.currentStroe.slug
    };
   
    this.auth.login(sendData, true).subscribe(
      data => {
        if (data.status == "OK") {
          this.gotoStoreLogin(data.result, sendData);
        } else {
          this.alertS.error(this.alertContainer, data.result.error, true, 5000);
          this.loading = false;
        }
      },
      error => {
        console.log(error.result.error);
        this.alertS.error(
          this.alertContainer,
          this.auth.getErrorMessage(error),
          true,
          5000
        );
        this.loading = false;
      }
    );
  }

  private gotoStoreLogin(user, data) {
    const returnUrl = "/admin/dashboard";
    // const returnUrl = user.setup ? "/admin/dashboard" : "/admin/newusertour";
    const a = eLogin(encrypt(encrypt(encrypt(JSON.stringify(user), 'upper'), 'lower')));
    data.store_name = 'sms';
    const href =
      domainName(data.store_name, "store") +
      `${returnUrl}?user=${a}`;
    window.open(href, "_self");
  }
}
