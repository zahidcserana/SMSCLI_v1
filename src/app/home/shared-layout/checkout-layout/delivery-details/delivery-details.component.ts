import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../modules/auth/auth.service";
import { HomeService } from "../../../home-service/home.service";

import { ActivatedRoute } from "@angular/router";
import {
  ShippingMethod,
  Cart,
  CartItem
} from "../../../home-modules/type.model";
import { CartService } from "../../../home-service/cart.service";

@Component({
  selector: "app-delivery-details",
  templateUrl: "./delivery-details.component.html",
  styleUrls: ["./delivery-details.component.css"]
})
export class DeliveryDetailsComponent implements OnInit {
  shipping;
  cart: Cart;
  cartItems: CartItem[] = [];
  driving_lc_required = false;
  ShippingMethod = true;
  show_shipping_method = true;
  billingForm: FormGroup;
  shippingForm: FormGroup;
  termsCondition = true;
  termsError = false;
  salesManError: boolean;
  show_payment_type_en: boolean;
  message;

  @Input() contents: any;
  @Output() confirBilling = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.billingForm = this.fb.group({
      first_name: [""],
      last_name: [""],
      mobile: [""],
      email: [""],
      company_name: "",
      address_line1: [""],
      city: [""],
      state_id: [""],
      zipcode: [""],
      shipping_first_name: [""],
      shipping_last_name: [""],
      shipping_address1: [""],
      shipping_address2: [""],
      shipping_mobile: [""],
      shipping_city: [""],
      shipping_state: [""],
      shipping_zipcode: [""],
      alt_phone: "",
      event_location: "",
      special_instructions: "",
      special_requests: "",
      // delivery_charge: '',
      driving_license: "",
      type: null
    });
    this.shipping = this.route.parent.snapshot.data.shipping;
    this.loadCart();
  }

  ngOnInit() {
    this.setBillingIfo();
  }

  ngAfterViewInit(): void {
    $("body").click();
  }

  loadCart() {
    if (this.cartService.userCart) {
      this.cart = this.cartService.userCart;
      this.cartItems = this.cart.cart_items;
      this.toggleShippingAddress();
    }
  }

  setBillingIfo() {
    let billing = this.billingForm.value;
    if (this.cartService.getBillingInfo()) {
      billing = { ...billing, ...this.cartService.getBillingInfo() };
    }
    const address = localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {};
    billing = { ...billing, ...address };
    console.log(billing);
    this.billingForm.patchValue(billing);
  }

  onSelectShippingMethod(e: any) {
    this.ShippingMethod = !this.ShippingMethod;
    if (e.target.checked) {
      this.billingForm
        .get("shipping_first_name")
        .setValue(
          this.billingForm.get("first_name").value +
            " " +
            this.billingForm.get("last_name").value
        );
      this.billingForm
        .get("shipping_last_name")
        .setValue(this.billingForm.get("last_name").value);
      this.billingForm
        .get("shipping_mobile")
        .setValue(this.billingForm.get("mobile").value);
      this.billingForm
        .get("shipping_address1")
        .setValue(this.billingForm.get("address_line1").value);
      this.billingForm
        .get("shipping_city")
        .setValue(this.billingForm.get("city").value);
      this.billingForm
        .get("shipping_zipcode")
        .setValue(this.billingForm.get("zipcode").value);
    } else {
      this.initBillingShippingInfo();
    }
  }

  initBillingShippingInfo() {
    this.billingForm.get("shipping_first_name").setValue("");
    this.billingForm.get("shipping_last_name").setValue("");
    this.billingForm.get("shipping_mobile").setValue("");
    this.billingForm.get("shipping_address1").setValue("");
    this.billingForm.get("shipping_city").setValue("");
    this.billingForm.get("shipping_zipcode").setValue("");
  }

  onSelecttermsCondition(e: any) {
    this.termsCondition = !this.termsCondition;
    if (this.termsCondition) {
      this.termsError = false;
    }
  }

  // billingForm(form: NgForm) {}
  submit() {
    this.checkDrivingLicense();
    if (
      this.driving_lc_required &&
      !this.billingForm.get("driving_license").value
    ) {
      return;
    }
    if (this.cart.delivery_charge > 0) {
      const address = this.cartService.formatAddress(
        this.billingForm.getRawValue()
      );
      localStorage.setItem("shippingAddress", JSON.stringify(address));
    }

    this.billingForm.get("type").setValue(1);
    this.cartService.saveBillinginfoStorage(this.billingForm.getRawValue());
    this.confirBilling.emit(true);
  }

  checkDrivingLicense() {
    const data = this.cartItems.find(cItem => {
      if (cItem.driving_license_required === true) {
        return true;
      }
    });
    if (data) {
      this.driving_lc_required = true;
    }
  }

  toggleShippingAddress() {
    if (this.cart.delivery_charge > 0 && this.cart.shipping_method ==2) {
      this.show_shipping_method = true;
    } else {
      this.show_shipping_method = false;
    }
  }

  selectSgippingMethod(e) {
    if (e.res) {
      const address = localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : null;
      if(address) {
        const billing = { ...this.billingForm.value, ...address };
        this.billingForm.patchValue(billing);
      } else {
        this.initBillingShippingInfo();
      }
      console.log(this.billingForm.value);
      
      this.loadCart();
      this.cartService.cartReload.next({ reload: true });
    }
    this.message = {
      msg: e.message,
      color: e.res ? { color: "green" } : { color: "red" }
    };
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}

export interface PaymentMethod {
  id?: number;
  type: string;
}
