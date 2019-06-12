import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Shipping } from "../../../models/settings.models";
import { SettingService } from "../../../setting-service/setting.service";

@Component({
  selector: "app-fedex",
  templateUrl: "./fedex.component.html",
  styleUrls: ["../../shipping-settings.component.css"]
})
export class FedexComponent implements OnInit {
  shipForm: FormGroup;
  loader: boolean;
  fedService = [];

  @Input("shipping") shipping: Shipping;
  @Input("id") id;
  @Input("edit") edit: boolean;
  @Output("submit") submit: EventEmitter<any> = new EventEmitter();

  constructor(private service: SettingService, private fb: FormBuilder) {
    this.getService();
  }

  ngOnInit() {
    this.shipForm = this.fb.group(this.initForm());
    if(this.edit) {
      this.shipForm.patchValue(this.shipping.config);
    }
  }

  getService() {
    this.service.getFedexService().subscribe(res => {
      this.fedService = [];
      for(const key in res) {
        const obj = {};
        obj['value'] = res[key];
        obj['name'] = res[key].replace(/_/g, ' ').replace('fedex', 'FedEx');
        this.fedService.push(obj);
      }
    });
  }

  private initForm() {
    return {
      service_code: ['', Validators.required],
      nickname: ["", Validators.required],
      account_number: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      company: [""],
      address1: ["", Validators.required],
      address2: [""],
      city: ["", Validators.required],
      state: ["", [Validators.required, Validators.maxLength(2)]],
      postal_code: ["", Validators.required],
      country_code: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      agree_to_eula: [true, Validators.required]
    };
  }

  save() {
    this.shipping.name = "FedEx";
    this.shipping.config = { ...this.shipping.config, ...this.shipForm.value };
    if (this.shipping.config["api_key"] || this.shipping.config['service_code']) {
      this.loader = true;
      this.service
        .addUpdateShipping(this.shipping, this.id, this.edit, this.submit)
        .then(res => (this.loader = false));
    } else {
      this.submit.emit({
        status: false,
        message: "Please fill required fileds."
      });
    }
  }
}
