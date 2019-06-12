import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
// import { changeNullToEmpty } from '../../../globals/_classes/functions';
import { ProductService } from "./product.service";
import { Cart, CartItem, Product } from "../home-modules/type.model";
import { HttpService } from "../../modules/http-with-injector/http.service";
import { changeNullToEmpty } from "../../globals/_classes/functions";
export interface CartviewSubjectConfig {
  reload?: boolean;
  items?: CartItem[];
}

export interface CartShowAlert {
  reload?: boolean;
  message?: string;
}
export interface OrderConfig {
  order_id: number;
}
export interface CartServiceConfig {
  reload?: boolean;
  items: CartItem[];
  rent?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class CartService {
  private cartsubject: CartviewSubjectConfig = { reload: false };
  cartReload = new BehaviorSubject(this.cartsubject);
  private orderSubject: OrderConfig = { order_id: 0 };
  getOrderId = new BehaviorSubject(this.orderSubject);
  private subject: CartServiceConfig = { reload: false, items: null };

  private showAlertSub: CartShowAlert = { reload: false };
  cartAlert = new BehaviorSubject(this.showAlertSub);
  constructor(
    private service: ProductService,
    // private homeService: HomeService,
    private http: HttpService
  ) {}

  addtoCart(data: any) {
    return this.http.post("carts/add-to-cart", data).toPromise();
  }

  saveCartsInlocalStorage(data) {
    localStorage.setItem("user_cart", JSON.stringify(data));
    // this.cartReload.next({ reload: true });
  }

  addpayment(paymnet) {
    return this.http.post("orders", paymnet).toPromise();
  }

  removeCart(data: CartItem) {
    return this.http
      .post("carts/cart-remove-item", {
        cart_item_id: Number(data.id),
        token: data.token,
        product_id: Number(data.product_id)
      })
      .toPromise()
      .then(res => {
        if (res.status === "OK") {
          this.saveCartsInlocalStorage(res.result.data);
          this.cartReload.next({ reload: true });
          return res;
        } else {
          const obj = {
            resut: null,
            status: "NOK"
          };
          return obj;
        }
      })
      .catch(err => {
        return err;
      });
  }
  updateCart(token: number | string, data: CartItem[]) {
    return this.http.post("carts/update", data).toPromise();
  }

  getBillingInfo() {
    return localStorage.getItem("billingInfo")
      ? JSON.parse(localStorage.getItem("billingInfo"))
      : null;
  }

  applyCoupon(data) {
    return this.http.post("carts/apply-coupon", data);
  }
  saveBillinginfoStorage(billingInfo) {
    localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
  }
  saveCart(data) {
    this.addtoCart(data)
      .then(res => {
        if (res.status === "OK") {
          if ("error" in res.result) {
            this.cartAlert.next({ reload: false, message: res.result.error });
          } else {
            this.cartAlert.next({ reload: true });
            this.saveCartsInlocalStorage(res.result.data);
            this.cartReload.next({
              reload: true,
              items: res.result.data.cart_items
            });
            localStorage.setItem("token", res.result.data.token);
            setTimeout(() => {}, 4000);
          }
        } else {
          this.cartAlert.next({ reload: false, message: res.result.error });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  formatAddress(data) {
    const obj = {};
    for (let s in data) {
      if (s.includes("shipping_")) {
        obj[s] = data[s];
      }
    }
    console.log(obj);
    return obj;
  }

  createCart(item: Product) {
    const cart = {
      driving_license_required: false,
      deposit_amount: 0,
      deposite_tax: false,
      sales_tax: item.sales_tax,
      product_id: Number(item.id),
      quantity: 1,
      variants_products_id: item.default_variant.variants_products_id,
      location: sessionStorage.getItem("online_store")
        ? JSON.parse(sessionStorage.getItem("online_store")).location.id
        : "",
      price: item.prices[0].price,
      rental_type: null,
      rental_duration: null,
      rent_start: null,
      term: null,
      token: localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null
    };
    this.saveCart(changeNullToEmpty(cart));
  }

  get shippingObj() {
    if (localStorage.getItem("user_cart")) {
      const cart: Cart = JSON.parse(localStorage.getItem("user_cart"));
      return { id: cart.shipping_method, pickup: cart.pickup };
    }
    return null;
  }

  downloadPdf(order_id) {
    this.http.get("pages/pdf?order_id=" + order_id);
  }

  getShippingList() {
    return this.http.get(`shipping-carrier-list`).pipe(
      map(res => res.result.data),
      catchError(e => of([]))
    );
  }

  get userCart() {
    return localStorage.getItem("user_cart")
      ? JSON.parse(localStorage.getItem("user_cart"))
      : null;
  }

  chageShippingMethod(data) {
    return this.http.post("orders/delivery-cost", data).toPromise();
  }

  getShippingMethod() {
    return this.http.get("shipping-method").pipe(
      map(res => {
        return res.result.data;
      })
    );
  }
}
