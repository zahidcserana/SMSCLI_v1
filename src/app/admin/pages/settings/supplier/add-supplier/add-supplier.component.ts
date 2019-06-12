import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import {Classes, Supplier} from '../../models/settings.models';
import { SettingService } from '../../setting-service/setting.service';
import { SidebarService } from '../../../sidebar-service/sidebar.service';
import { Subscription } from 'rxjs';

declare let $:any;

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit, OnDestroy {

  loader: boolean;
  sub: Subscription;
  edit: boolean;

  @Input('supplier') supplier: Supplier;
  @Input('classes') classes: Classes;
  @Output('submit') submitForm: EventEmitter<any> = new EventEmitter();


  constructor(
    private settingS: SettingService,
    private sidebarS: SidebarService
  ) {}


  ngOnInit() {
    this.sub = this.settingS.addEditOpen.subscribe(
      val => {
        if(val.open) {
          // console.log(val);
          if(val.edit) {
            this.edit = val.edit;
          } else {
            this.supplier = new Supplier();
            this.edit = false;
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit(f){
    this.loader = true;
    this.settingS.addSection(this.supplier)
    .then(
      res => {
        console.log(res);
        if(res.status === 'OK') {
          this.sendEmitedData(false, res.result.message);
          this.supplier = new Supplier();
          f.form.reset();
        } else {
          this.sendEmitedData(true, res.result.error);
        }
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Section has been not added');
      }
    );
  }

  sendEmitedData(error, message) {
    this.loader = false;
    // console.log(result);
    const emit_data = {alert: {error: error, message: message}};
    this.submitForm.emit(emit_data);
  }

  update() {
    this.loader = true;
      console.log('-----');
      console.log(this.supplier);
      console.log('-----');
    this.settingS.updateSection(this.supplier)
    .then(
      res => {
        if(res.status === 'OK') {
          this.sendEmitedData(false, res.result.message);
        } else {
          this.sendEmitedData(true, res.result.error);
        }
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Section has been not updated');
      }
    );
  }

}
