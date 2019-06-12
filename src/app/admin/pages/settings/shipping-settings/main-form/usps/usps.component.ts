import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Shipping } from '../../../models/settings.models';
import { SettingService } from '../../../setting-service/setting.service';

@Component({
  selector: 'app-usps',
  templateUrl: './usps.component.html',
  styleUrls: ['../../shipping-settings.component.css']
})
export class UspsComponent implements OnInit {

  shipForm: FormGroup;
  loader: boolean;

  @Input("shipping") shipping: Shipping;
  @Input("id") id;
  @Input("edit") edit: boolean;
  @Output("submit") submit: EventEmitter<any> = new EventEmitter();

  constructor(private service: SettingService, private fb: FormBuilder) {}

  ngOnInit() {
    this.shipForm = this.fb.group(this.initForm());
    if(this.edit) {
      this.shipForm.patchValue(this.shipping.config);
    }
  }

  private initForm() {
    return {
      
    }
  }

  save() {
    this.shipping.name = 'USPS';
    this.shipping.config = {...this.shipping.config, ...this.shipForm.value};
    console.log(this.shipping)
    if(this.shipping.config['api_key']) {
      this.loader = true;
      // this.service
    //   .addUpdateShipping(this.shipping, this.id, this.edit, this.submit)
    //   .then(res => (this.loader = false));
    } else {
      this.submit.emit({ status: false, message: 'Please enter ship engine api key.' })
    }
  }

}
