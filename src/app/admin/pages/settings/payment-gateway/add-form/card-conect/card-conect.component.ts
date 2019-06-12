import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingService } from '../../../setting-service/setting.service';
import { Gateway } from '../../../models/settings.models';

@Component({
  selector: 'app-card-conect',
  templateUrl: './card-conect.component.html',
  styleUrls: ['./card-conect.component.css']
})
export class CardConectComponent implements OnInit {

  gateForm: FormGroup;
  loader: boolean;
  

  @Input('gateway') gateway: Gateway;
  @Input('fields') fields: string[];
  @Input('id') id;
  @Input('edit') edit: boolean;
  @Output('submit') submit:EventEmitter <any> = new EventEmitter();

  constructor(
    private service: SettingService, 
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    // console.log(this.gateway, this.fields);
    this.gateForm = this.fb.group(this.gateway.config);
    if(this.edit) {
      this.gateForm.patchValue(this.gateway.config);
    }
  }

  showPass(pass: HTMLElement) {
    const type = pass.getAttribute('type');
    if(type==='password') {
      pass.setAttribute('type', 'text');
    } else {
      pass.setAttribute('type', 'password');
    }
  }


  save() {
    this.loader = true;
    this.gateway.status = +this.gateway.status;
    this.gateway.config = this.gateForm.value;
    // console.log(this.gateway);
    this.service.addUpdateGateway(this.gateway, this.id, this.edit, this.submit).then(
      res => this.loader = false
    );
    
  }

}
