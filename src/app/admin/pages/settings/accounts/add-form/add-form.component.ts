import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account, Accounts} from "../../models/settings.models";
import {SettingService} from "../../setting-service/setting.service";
import {SidebarService} from "../../../sidebar-service/sidebar.service";
import {Subscription} from "rxjs";

declare let $: any;

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

    loader: boolean;
    sub: Subscription;
    edit: boolean;

    @Input('account') account: Accounts;
    @Output('submit') submitForm: EventEmitter<any> = new EventEmitter();
    constructor(
        private settingS: SettingService,
        private sidebarS: SidebarService
    ) {}

  ngOnInit() {

      this.sub = this.settingS.addEditOpen.subscribe(
          val => {
              if (val.open) {
                  if(val.edit) {
                      this.edit = val.edit;
                  } else {
                      this.edit = false;
                  }
              }
          }
      );
  }
    submit(){
        this.loader = true;
        this.settingS.addAccount(this.account)
            .then(
                res => {
                    console.log(res);
                    this.sendEmitedData(res.result.data, false, 'Account has been added', true);
                }
            ).catch(
            err => {
                console.log(err);
                this.sendEmitedData([], true, 'Something wrong! Account has been not added');
            }
        );
    }

    update() {
        this.loader = true;
        this.settingS.updateAccount(this.account)
            .then(
                res => {
                    this.sendEmitedData(res.result.data, false, 'Account has been updated', false);
                }
            ).catch(
            err => {
                console.log(err);
                this.sendEmitedData([], true, 'Something wrong! Account has been not updated');
            }
        );
    }

    sendEmitedData(result, error, message, add?) {
        this.loader = false;
        const emit_data = {data: result, alert: {error: error, message: message}, add: add};
        this.submitForm.emit(emit_data);
    }
}
