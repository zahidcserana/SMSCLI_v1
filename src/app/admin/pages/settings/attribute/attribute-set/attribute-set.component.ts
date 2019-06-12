import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { SidebarService } from '../../../sidebar-service/sidebar.service';
import { VariantSet } from '../../models/settings.models';
import { SettingService } from '../../setting-service/setting.service';
import { GET_STORE_ID } from '../../../../../globals/_classes/functions';


@Component({
  selector: 'attribute-set',
  templateUrl: './attribute-set.component.html',
  styleUrls: ['./attribute-set.component.css']
})
export class AttributeSetComponent implements OnInit {

  loader: boolean;

  @Input('edit') edit: boolean;
  @Input('attributeSet') attributeSet: VariantSet = new VariantSet();
  @Output('submit') submit:EventEmitter <any> = new EventEmitter();

  constructor(
    private sidebarS:SidebarService,
    private settingS: SettingService
  ) {}

  ngOnInit() {
  }

  submitAttributeSet(){
    this.loader = true;
    this.attributeSet.store_id = GET_STORE_ID();
    // console.log(this.attributeSet);
    this.settingS.addAttributeSet(this.attributeSet)
    .then(
      res => {
        console.log(res);
        if (res.result.error) {
          this.sendEmitedData(true, res.result.error);
        } else {
          this.sendEmitedData(false, 'Variant has been added');
          this.attributeSet = new VariantSet();
        }
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Variant has been not added');
      }
    );
  }

  sendEmitedData(error, message) {
    this.loader = false;
    const emit_data = {alert: {error, message}};
    this.submit.emit(emit_data);
  }

  updateAttributeSet() {
    this.loader = true;
    this.settingS.updateAttributeSet(this.attributeSet.id,this.attributeSet)
    .then(
      res => {
        console.log(res);
        if (res.result.error) {
          this.sendEmitedData(true, res.result.error);
        } else {
          this.sendEmitedData(false, 'Variant has been updated');
        }
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Variant has been not updated');
      }
    );
  }


}
