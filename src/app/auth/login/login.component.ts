import { Helpers } from "./../../helpers";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PreAuthService } from "../pre-auth.service";
import { AlertService } from "../../modules/alert/alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../auth.component.css"]
})
export class LoginComponent implements OnInit {
  model: any = {
    email: "",
    password: ""
  };
  loading = false;

  @ViewChild("hasAlert") alertContainer: ElementRef;

  constructor(
    private _router: Router,
    private activeRoute: ActivatedRoute,
    private alert: AlertService,
    private auth: PreAuthService
  ) {}

  ngOnInit() {
    Helpers.setLoading(false);
  }

  signIn() {
    this.loading = true;
    this.auth.login(this.model, false).subscribe(
      data => {
        if (data.status == "OK") {
          let user = data.result;
          this.auth.setUser(user, true);
          Helpers.setLoading(true);
          this._router.navigate(["/partner/dashboard"]);
          this.loading = false;
        } else {
          this.alert.error(this.alertContainer, data.result.error, true, 5000);
          this.loading = false;
        }
      },
      error => {
        console.log(error.result.error);
        $("custom-alert").css("display", "block");
        this.alert.error(
          this.alertContainer,
          this.auth.getErrorMessage(error),
          true,
          5000
        );
        this.loading = false;
      }
    );
  }
}
