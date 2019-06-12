import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from "@angular/core";
import { Helpers } from "../../helpers";
import { PreAuthService } from "../pre-auth.service";
import { AlertService } from "../../modules/alert/alert.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sms-activation",
  templateUrl: "./sms-activation.component.html",
  styleUrls: ["../auth.component.css"]
})
export class SmsActivationComponent implements OnInit, OnDestroy {
  activationInfo = {
    email: "",
    mobile: ""
  };
  activationCode: string;
  smsSend: boolean;
  loading: boolean;
  validPhone: boolean;
  message: string;

  @ViewChild("hasAlert") alertContainer: ElementRef;

  constructor(
    private router: Router,
    private alert: AlertService,
    private auth: PreAuthService
  ) {}

  ngOnInit() {
    Helpers.setLoading(false);
    this.activationInfo.email = sessionStorage.getItem("smsEmail");
    this.message = null;
  }

  ngOnDestroy () {
    sessionStorage.removeItem("smsEmail");
  }

  phoneSelect(e) {
    this.validPhone = e.valid;
    this.activationInfo.mobile = e.tel;
  }

  submitPhone() {
    this.loading = true;
    this.auth.sendActivationSMS(this.activationInfo).subscribe(
      res => {
        this.loading = false;
        if (res.status === "OK") {
          this.smsSend = true;
          this.alert.success(
            this.alertContainer,
            res.result.message,
            true,
            3000
          );
          sessionStorage.removeItem("smsEmail");
        } else {
          this.alert.error(
            this.alertContainer,
            res.result.message ? res.result.message : res.result.error,
            true,
            3000
          );
        }
      },
      err => this.error(err)
    );
  }

  submitCode() {
    this.loading = true;
    this.auth.sendActivationBySMS(this.activationCode).subscribe(
      res => {
        this.loading = false;
        if (res.status === "OK") {
          this.message = res.result.message;
        } else {
          this.alert.error(
            this.alertContainer,
            res.result.message ? res.result.message : res.result.error,
            true,
            3000
          );
        }
      },
      err => this.error(err)
    );
  }

  error(err) {
    console.error(err);
    this.loading = false;
    this.alert.error(
      this.alertContainer,
      err.result && err.result.error
        ? err.result.error
        : "Something went wrong!!! Please try again.",
      true,
      3000
    );
  }
}
