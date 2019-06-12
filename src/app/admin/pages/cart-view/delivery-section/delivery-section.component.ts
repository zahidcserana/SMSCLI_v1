import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { GET_USER, getShipMethod, getShipId } from "../../../../globals/_classes/functions";
import { ShippingAddressModalComponent } from "../../../../modules/shipping-address-modal/shipping-address-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "../../../cart-service/cart.service";

@Component({
  selector: "app-delivery-section",
  templateUrl: "./delivery-section.component.html",
  styleUrls: ["./delivery-section.component.css"]
})
export class DeliverySectionComponent implements OnChanges {
  pickup;
  locationId = GET_USER().location_id;
  shippingSelect = 0;
  loader: boolean;
  message;
  shipList = [];

  @Input("shipping") shipping;
  @Input("locationList") locationList;
  @Input("productList") productList;
  @Output("load") load = new EventEmitter();

  constructor(private modalService: NgbModal, private cartS: CartService) {
    this.getShippings();
  }

  ngOnChanges() {
    if (this.shipping) {
      this.storeShippingMethod();
      setTimeout(() => {
        this.selectPickup();
      }, 1000);
    }
  }

  private getShippings() {
    this.cartS.getShippingList().subscribe(
      res => {
        this.shipList = res;
      }
    );
  }

  getAddress() {
    const data = sessionStorage.getItem("deliveryCharge");
    if(data) {
      const charge = JSON.parse(data);
      if(charge.charge_by === 'location')
      return charge.location.delivery_to + ' (' + 
      charge.location.distance + (charge.location.distance > 1 ? (' ' + charge.location.unit + ' / $') : (charge.location.unit == 'Km' ? ' Km / $' : ' Miles / $')) +  charge.location.unit_price + ' per ' + charge.location.unit + ' )';
    }
    return '';
  }

  get check () {
    return this.shipList.map( m => m.id).includes(+this.shippingSelect);
  }

  selectSgippingMethod(event?) {
    let sendData;
    this.selectPickup();
    if (
      this.shippingSelect != 0 &&
      (!this.shipping.delivery_settings.charge_by_zone || this.check)
    ) {
      event.srcElement.blur();
      event.preventDefault();
      this.openShippingModal();
    } else {
      sendData = {
        token: this.productList.token,
        pickup: this.pickup,
        shipping_method: this.shippingSelect == 0 ? 1 : 2
      };
      this.addShipping(sendData);
    }
  }

  openShippingModal() {
    const modalStatus = this.modalService.open(ShippingAddressModalComponent, {
      centered: true,
      size: "lg"
    });
    modalStatus.componentInstance.address = sessionStorage.getItem(
      "shippingAddress"
    )
      ? JSON.parse(sessionStorage.getItem("shippingAddress"))
      : null;
    modalStatus.result.then(
      result => {
        if (result) {
          const sendData = {
            token: this.productList.token,
            address: result,
            pickup: this.check ? this.locationId : +this.shippingSelect,
            shipping_method: this.check ? getShipMethod(this.shipList, this.shippingSelect) : 3
          };
          this.addShipping(sendData);
        } else {
          this.storeShippingMethod();
        }
      },
      res => {
        this.storeShippingMethod();
      }
    );
  }

  storeShippingMethod() {
    const cart = this.cartS.getSessionData("cartList");
    if (cart) {
      this.shippingSelect = [2, 3].includes(cart.shipping_method)
        ? this.checkPickup(cart.pickup)
        : ([4,5].includes(cart.shipping_method) ? getShipId(this.shipList, cart.shipping_method) : 0);
      if([2, 3].includes(cart.shipping_method) && this.shippingSelect != cart.pickup) {
        this.pickup = this.locationId;
        this.selectSgippingMethod()
      }
    } else {
      this.shippingSelect = 0;
    }
    if (this.shippingSelect != 0 && [2, 3].includes(cart.shipping_method)) {
      this.pickup = this.shippingSelect;
      this.selectStore();
    }
  }

  private checkPickup(data) {
    const id = this.shipping.data.map( m => m.id).includes(data);
    
    return id ? data : 0;
  }

  private selectPickup() {
    this.pickup =
      this.shippingSelect == 0 || this.check
        ? this.getPickUpId()
        : this.shippingSelect;
    this.selectStore();
  }

  private getPickUpId() {
    const pick = this.cartS.getSessionData("pickup");
    const loc = pick ? this.locationList.find( f => f.id == pick) : null;
    return this.shippingSelect == 0 && loc ? pick : this.locationId;
  }

  selectStore() {
    this.cartS.setSessionData("pickup", this.pickup);
  }

  addShipping(data) {
    this.loader = true;
    this.cartS
      .addShipping(data)
      .then(res => {
        this.loader = false;
        if (res.status === "OK" && !res.result.error) {
          this.productList = res.result.data;
          sessionStorage.setItem(
            "deliveryCharge",
            JSON.stringify(res.result.delivery)
          );
          if ([3,4,5].includes(data.shipping_method)) {
            sessionStorage.setItem(
              "shippingAddress",
              JSON.stringify(data.address)
            );
          }
          if (data.shipping_method === 1) {
            sessionStorage.removeItem("shippingAddress");
          }
          this.setMessage({
            msg: "Successfully Updated",
            color: { color: "green" }
          });
        } else {
          this.removeShippingAddress();
        }
        this.load.emit({ status: true, data: this.productList });
      })
      .catch(err => {
        this.removeShippingAddress();
        this.load.emit({ status: true, data: this.productList });
      });
  }

  private setMessage(data) {
    this.message = data;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }

  removeShippingAddress() {
    this.setMessage({
      msg: "Sorry, Please try again.",
      color: { color: "red" }
    });
    this.loader = false;
    this.storeShippingMethod();
    if (this.shippingSelect == 0) {
      sessionStorage.removeItem("shippingAddress");
    }
    this.selectPickup();
  }
}
