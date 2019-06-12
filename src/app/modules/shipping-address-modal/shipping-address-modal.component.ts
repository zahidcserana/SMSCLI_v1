import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-shipping-address-modal",
  templateUrl: "./shipping-address-modal.component.html",
  styleUrls: ["./shipping-address-modal.component.css"]
})
export class ShippingAddressModalComponent implements OnInit {

  billing;
  billingForm: FormGroup;

  @Input('address') address;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    if(this.address) {
      this.billingForm.patchValue(this.address);
    }
  }

  initForm() {
    this.billingForm = this.fb.group({
      shipping_address1: ["", Validators.required],
      shipping_first_name: ["", Validators.required],
      shipping_last_name: ["", Validators.required],
      shipping_address2: [""],
      shipping_mobile: ["", Validators.required],
      shipping_city: ["", Validators.required],
      shipping_state: ["", Validators.required],
      shipping_zipcode: ["", Validators.required]
    });
  }

  submit() {
    this.activeModal.close(this.billingForm.value);
  }
}
