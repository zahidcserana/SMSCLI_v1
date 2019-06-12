import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { ErrorMessage, getShipId, getShipMethod } from "../../../globals/_classes/functions";
import { HomeService } from "../../home-service/home.service";
import { CartService } from "../../home-service/cart.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShippingAddressModalComponent } from "../../../modules/shipping-address-modal/shipping-address-modal.component";

@Component({
  selector: "app-shipping-method",
  templateUrl: "./shipping-method.component.html",
  styleUrls: ["./shipping-method.component.css"]
})
export class ShippingMethodComponent implements OnInit, OnChanges {
  submitting: boolean;
  cart;
  locations = [];
  selectedMethod = 0;
  selectedPickup;
  shipLocation = JSON.parse(sessionStorage.getItem("online_store")).location.id;
  shipList = [];

  @Input() type = "cart";
  @Input() shipping;
  @Input() address;
  @Output() onSelectShipping = new EventEmitter();

  constructor(
    private cartService: CartService,
    private modalService: NgbModal,
    private homeService: HomeService
  ) {
    this.getShippings();
  }

  ngOnInit() {
    this.cart = this.cartService.userCart;
    if (this.cartService.userCart) {
      this.cart = this.cartService.userCart;
      this.getSelectedShipping();
    }

    this.homeService.getLocations().then(res => {
      this.locations = res ? res : [];
      if (this.locations.length) {
        this.selectedPickup = localStorage.getItem("pickup")
          ? localStorage.getItem("pickup")
          : this.shipLocation;
        this.selectStore();
      }
    });
  }

  ngOnChanges() {
    if (this.shipping) {
      this.getSelectedShipping();
    }
  }

  private getShippings() {
    this.cartService.getShippingList().subscribe(
      res => {
        this.shipList = res;
        this.getSelectedShipping();
      }
    );
  }

  getAddress() {
    const data = localStorage.getItem("deliveryCharge");
    if(data) {
      const charge = JSON.parse(data);
      if(charge.charge_by === 'location')
      return charge.location.delivery_to + ' (' + 
      charge.location.distance + (charge.location.distance > 1 ? (' ' + charge.location.unit + ' / $') : (charge.location.unit == 'Km' ? ' Km / $' : ' Miles / $')) +  charge.location.unit_price + ' per ' + charge.location.unit + ' )';
    }
    return '';
  }

  getSelectedShipping() {
    const obj = this.cartService.shippingObj;
    if (obj) {
      this.selectedMethod = [2, 3].includes(obj.id)
        ? this.checkPickup(obj.pickup)
        : ([4,5].includes(obj.id) ? getShipId(this.shipList, obj.id) : 0);
      if ([2, 3].includes(obj.id) && this.selectedMethod != obj.pickup) {
        this.selectedPickup = this.shipLocation;
        setTimeout(() => {
          this.openModal();
        }, 1000);
      }
    } else {
      this.selectedMethod = 0;
    }
    if (this.selectedMethod != 0 && [2, 3].includes(obj.id)) {
      this.selectedPickup = this.selectedMethod;
      this.selectStore();
    }
  }

  checkPickup(data) {
    if (this.shipping.delivery_settings.charge_by_zone) {
      const id = this.shipping.data.map(m => m.id).includes(data);
      return id ? data : 0;
    } else {
      return data == this.shipLocation ? data : 0;
    }
  }

  openModal(event?) {
    let sendData;
    this.selectPickup();
    if (
      this.selectedMethod != 0 &&
      (!this.shipping.delivery_settings.charge_by_zone || this.check)
    ) {
      if (this.address) {
        if (this.address.shipping_city) {
          sendData = {
            token: this.cart.token,
            address: this.cartService.formatAddress(this.address),
            pickup: this.check ? this.shipLocation : +this.selectedMethod,
            shipping_method: this.check ? getShipMethod(this.shipList, this.selectedMethod) : 3
          };
          this.selectSgippingMethod(sendData);
        } else {
          event.srcElement.blur();
          event.preventDefault();
          this.openShippingModal();
        }
      } else {
        event.srcElement.blur();
        event.preventDefault();
        this.openShippingModal();
      }
    } else {
      sendData = {
        token: this.cart.token,
        pickup: this.selectedPickup,
        shipping_method: this.selectedMethod == 0 ? 1 : 2
      };
      this.selectSgippingMethod(sendData);
    }
  }

  get check () {
    return this.shipList.map( m => m.id).includes(+this.selectedMethod);
  }

  private selectPickup() {
    this.selectedPickup =
      this.selectedMethod == 0 || this.check ? this.getPickUpId() : this.selectedMethod;
    this.selectStore();
  }

  private getPickUpId() {
    const pick = localStorage.getItem("pickup");
    const loc = pick ? this.locations.find( f => f.id == pick) : null;
    return this.selectedMethod == 0 && loc ? pick : this.shipLocation;
  }

  openShippingModal() {
    const modalStatus = this.modalService.open(ShippingAddressModalComponent, {
      centered: true,
      size: "lg"
    });
    modalStatus.componentInstance.address = localStorage.getItem(
      "shippingAddress"
    )
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : null;
    modalStatus.result.then(
      result => {
        if (result) {
          const sendData = {
            token: this.cart.token,
            address: result,
            pickup: this.check ? this.shipLocation : this.selectedMethod,
            shipping_method: this.check ?  getShipMethod(this.shipList, this.selectedMethod) : 3
          };
          this.selectSgippingMethod(sendData);
        } else {
          this.getSelectedShipping();
        }
      },
      res => {
        this.getSelectedShipping();
      }
    );
  }

  removeShippingAddress() {
    this.getSelectedShipping();
    if (this.selectedMethod == 0) {
      localStorage.removeItem("shippingAddress");
    }
    this.selectPickup();
  }

  selectSgippingMethod(data) {
    this.submitting = true;
    this.cartService
      .chageShippingMethod(data)
      .then(res => {
        if (res.status === "OK" && !res.result.error) {
          this.cartService.cartReload.next({ reload: true });
          this.cart = res.result.data;
          this.cartService.saveCartsInlocalStorage(res.result.data);
          localStorage.setItem(
            "deliveryCharge",
            JSON.stringify(res.result.delivery)
          );
          if ([3,4,5].includes(data.shipping_method)) {
            localStorage.setItem(
              "shippingAddress",
              JSON.stringify(data.address)
            );
          }

          if (data.shipping_method === 1) {
            localStorage.removeItem("shippingAddress");
          }
          this.onSelectShipping.emit({
            res: true,
            message: "Delivery method change successfully"
          });
        } else {
          this.onSelectShipping.emit({ res: false, message: res.result.error });
          this.removeShippingAddress();
        }
        this.submitting = false;
      })
      .catch(err => {
        this.selectedMethod = 0;
        this.onSelectShipping.emit({
          res: false,
          message: ErrorMessage.message
        });
        this.submitting = false;
        this.removeShippingAddress();
      });
  }

  selectStore() {
    localStorage.setItem("pickup", this.selectedPickup);
  }
}
