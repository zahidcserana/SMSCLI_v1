import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { SettingService } from '../../setting-service/setting.service';
import { SidebarService } from '../../../sidebar-service/sidebar.service';
import { Subscription } from 'rxjs';
import { Stores } from '../../models/settings.models';

declare let $:any;

@Component({
  selector: 'app-add-terminal',
  templateUrl: './add-terminal.component.html',
  styleUrls: ['./add-terminal.component.css']
})
export class AddTerminalComponent implements OnInit {

  loader: boolean;

  @Input('terminal') terminal: Stores;
  @Input('edit') edit: boolean;
  @Output('submit') submitForm: EventEmitter<any> = new EventEmitter();


  constructor(
    private settingS: SettingService,
    private sidebarS: SidebarService
  ) {}


  ngOnInit() {
    
  }

  submit(){
    this.loader = true;
    this.terminal.stores_terminals = [];
    console.log(this.terminal);
    this.settingS.addClass(this.terminal)
    .then(
      res => {
        console.log(res);
        this.sendEmitedData(false, 'The store has been saved successfully');
        this.terminal = new Stores();
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! The store has been not added');
      }
    );
  }

  sendEmitedData(error, message) {
    this.loader = false;
    const emit_data = {error: error, message: message};
    this.submitForm.emit(emit_data);
  }

  update() {
    this.loader = true;
    console.log(this.terminal);
    this.settingS.updateClass(this.terminal)
    .then(
      res => {
        this.sendEmitedData(false, 'The class has been updated');
        this.terminal = new Stores();
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! class has been not updated');
      }
    );
  }

}
