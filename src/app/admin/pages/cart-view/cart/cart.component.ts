import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { DialogBoxComponent } from "../../../../modules/dialog-box/dialog-box.component";
import { product_image } from "../../../../globals/endPoint/config";
import { Subscription } from "rxjs";
import { AlertService } from "../../../../modules/alert/alert.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "../../../cart-service/cart.service";
import { CartItem, Coupon } from "../../../cart-service/cart.models";
import {
  GET_USER,
  convertTime12to24,
  formatProductSearch,
  changeNullToEmpty,
  formateRentType
} from "../../../../globals/_classes/functions";
import { Observable } from "rxjs/internal/Observable";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
  retry,
  catchError
} from "rxjs/operators";
import { SidebarService } from "../../sidebar-service/sidebar.service";
import { ProductDiscountComponent } from "../product-discount/product-discount.component";


declare let $: any;

interface Price {
  base: {};
  rent: any[];
}

class RentStart {
  date: string;
  time: string;
}

class Variant {
  variants: Attr[] = [];
  variants_products_id: number;
}

class Attr {
  attr_set_id: number;
  attr_set: string;
  attr: string;
}

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit, AfterViewInit {
  imageUrl = product_image + GET_USER().store_id;
  loader_sub: boolean;
  loader: boolean;
  loaderAdd: boolean;
  sub: Subscription[] = [];
  product = null;
  productPrice: Price;
  mode: number = 1;
  item: CartItem;
  rentalStart: RentStart = new RentStart();
  rentPriceId = 0;
  productList;
  variants: Variant = new Variant();
  locationList = [];
  shipping;
  session = ["cartList"];
  edit: boolean;
  rent: boolean;
  index: number;
  couponCode: Coupon = new Coupon();
  increament: number;
  fromInventory: boolean = true;
  searchData: any[] = [];
  calenderDate: string;

  @Output("clear") clear: EventEmitter<any> = new EventEmitter();
  @Output("checkOut") checkOut: EventEmitter<any> = new EventEmitter();
  @ViewChild("hasCusAlert") alertContainer: ElementRef;

  constructor(
    private alertS: AlertService,
    private modalService: NgbModal,
    private cartS: CartService,
    private sidebarS: SidebarService
  ) {
    this.sub[0] = this.cartS.location.subscribe(val => {
      if (val) {
        this.locationList = val.filter(m => {
          return m.status == 1;
        });
      }
    });
    this.sub[1] = this.cartS.cartNo.subscribe(val => {
      if (val && val.cart_items.length > 0) {
        this.productList = val;
      } else {
        const data = this.cartS.getSessionData("cartList");
        this.productList = data ? data : null;
      }
      const cop = this.cartS.getSessionData("coupon");
      this.couponCode = cop ? cop : new Coupon();
    });
    this.getShipping();
  }

  ngOnInit() {
    this.sub[2] = this.cartS.getId.subscribe(val => {
      if (val && val.id !== 0) {
        this.sidebarS.openSub.next(false);
        this.edit = false;
        this.loader_sub = false;
        this.product = null;
        this.calenderDate = val.date ? val.date : null;
        if ("variant" in val && val.variant) {
          $(".admin-cart input").val(val.name.trim());
          this.RentAddCart(val.variant);
        } else {
          $(".admin-cart").click();
          $(".admin-cart input").val("");
          this.fromInventory = true;
          $(".admin-cart input").focus();
          $(".admin-cart input").val(val.name.trim());
          this.fromInventory = false;
        }
      }
    });
    this.changeCartNo();
    this.sidebarS.sidebarOpen.subscribe(val => {
      if (!val) {
        this.reset();
      } else {
        $(".native-routing-container-cart").scrollTop(0, 0);
      }
    });

    this.cartS.cartDiscount.subscribe(res => {
      if (res.reload) {
        this.productList = res.cart;
        this.updateCartList();
      }
    });
  }

  ngAfterViewInit() {
    this.dateTimePicker(new Date());
  }

  get cartToken() {
    const cartToken = this.cartS.getSessionData("cartToken");
    return cartToken ? cartToken : null;
  }

  async getShipping() {
    this.shipping = await this.cartS.getShipping();
  }

  ClearFullCart() {
    this.clear.emit(true);
  }

  /* ************** Autocomplete *********** */

  closeSearch() {
    this.loader_sub = false;
    this.fromInventory = false;
    $(".admin-cart input").val("");
  }

  onFocus(e: Event): void {
    if (this.fromInventory || this.loader_sub) {
      e.stopPropagation();
      setTimeout(() => {
        const inputEvent: Event = new Event("input");
        e.target.dispatchEvent(inputEvent);
      }, 100);
    }
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        $(".admin-cart").click();
        this.searchData = [];
        this.loader_sub = true;
      }),
      switchMap(term => {
        this.loader_sub = true;
        return this.getProductList(term);
      }),
      tap(() => {
        this.loader_sub = false;
        setTimeout(() => {
          this.loader_sub = false;
          this.cartS.formateSearchList(this.searchData);
          $(".buy-search").click(e => {
            e.preventDefault();
            let attr = $(e.target).data("attr");
            if (typeof attr == "string") {
              attr = parseInt(attr);
            }
            const data = this.cartS.findAttrProId(this.searchData, attr);
            this.BuyAddCart(data);
          });
          $(".rent-search").click(e => {
            e.preventDefault();
            let attr = $(e.target).data("attr");
            if (typeof attr == "string") {
              attr = parseInt(attr);
            }
            const data = this.cartS.findAttrProId(this.searchData, attr);
            this.RentAddCart(data);
          });
        }, 100);
      })
    );
  };

  private getProductList(params): any {
    if (!params && params === "") {
      this.loader_sub = false;
      return [];
    }
    const search = "search=" + params.trim();
    return this.cartS.searchProduct(search).pipe(
      map(res => {
        this.loader_sub = false;
        this.searchData = formatProductSearch(res.result.data);
        return this.searchData;
      }),
      retry(3),
      catchError(() => {
        this.loader_sub = false;
        return [];
      })
    );
  }

  formatter = x => x.name;

  BuyAddCart(b) {
    this.variants = new Variant();
    this.edit = false;
    this.rent = false;
    this.formatvariant(b);
    this.getProduct(b.variants_products_id, true);
  }

  RentAddCart(r) {
    this.variants = new Variant();
    this.rent = true;
    this.edit = false;
    this.formatvariant(r);
    this.getProduct(r.variants_products_id, false);
  }

  formatvariant(data) {
    this.variants.variants_products_id = data.variants_products_id;
    this.variants.variants = [];
    for (let i = 0; i < data.variant_chain_name.length; i++) {
      let obj: Attr = new Attr();
      obj.attr_set_id = data.variant_set_id[i];
      obj.attr_set = data.variant_set_name[data.variant_set_id[i]];
      obj.attr = data.variant_chain_name[i];
      this.variants.variants.push(obj);
    }
  }

  /* Autocomplete */

  private dateTimePicker(date) {
    this.cartS.datePicker(date);
    this.rentalDateChange();
    this.rentalTimeChange();
  }

  initProduct() {
    this.item = new CartItem();
    this.item.quantity = 1;
    this.item.token = this.cartS.getSessionData("cartToken")
      ? this.cartS.getSessionData("cartToken")
      : null;
  }

  getProduct(i, buy: boolean, auto?: boolean) {
    this.loader_sub = true;
    this.cartS.getProduct(i).subscribe(
      res => {
        this.loader_sub = false;
        if (!this.edit) {
          this.initProduct();
        }
        this.product = res.data;
        this.formateProductCart(buy, auto);
      },
      err => {
        this.loader_sub = false;
        this.error(err, "Something wrong! Please try again");
      }
    );
  }

  formateProductCart(buy, auto) {
    this.productPrice = this.cartS.formatePrice(this.product.prices);
    this.item.sales_tax = this.product.sales_tax;
    this.item.product_id = this.product.id;
    /* New data */
    this.item.variants_products_id = this.variants.variants_products_id;

    const blen = Object.keys(this.productPrice.base).length;
    const rlen = this.productPrice.rent.length;
    if (blen > 0 || rlen > 0) {
      if (auto) {
        this.autoAdd(blen, rlen);
      } else {
        this.checkBuy(buy);
      }
    } else {
      this.product = null;
      this.alertS.info(
        this.alertContainer,
        "Sorry!!! Product has no price. Please add price.",
        true,
        5000
      );
    }
  }

  autoAdd(b, r) {
    switch (true) {
      case b > 0 && r < 1:
        this.rent = false;
        this.checkBuy(true);
        break;
      case b > 0 && r > 0:
        this.rent = false;
        this.mode = 1;
        this.formateBuy();
        break;
      default:
        this.rent = true;
        this.checkBuy(false);
        break;
    }
  }

  checkBuy(buy) {
    if (buy) {
      this.productPrice.rent = [];
      this.formateBuy();
      this.addItem();
    } else {
      this.mode = 2;
      if (this.productPrice.rent.length > 0) {
        const ind = this.productPrice.rent.findIndex(
          f =>
            f.price === this.item.price && f.rent_type === this.item.rental_type
        );
        if (ind > -1) {
          this.formateRent(this.productPrice.rent[ind], ind);
        } else {
          this.formateRent(this.productPrice.rent[0], 0);
        }
      }
    }
  }

  formateBuy() {
    this.item.price = this.productPrice.base["price"];
    this.item.rental_duration = this.productPrice.base["rent_duration"];
    this.item.rental_type = this.productPrice.base["rent_type"];
    this.item.term = this.productPrice.base["duration"];
  }

  formateRent(data, i) {
    if (this.product.driving_license) {
      this.item.driving_license_required = true;
    }
    this.rentPriceId = i;
    this.item.price = data["price"];
    this.item.rental_duration = this.item.rental_duration
      ? this.item.rental_duration
      : data["rent_duration"];
    this.item.rental_type = data["rent_type"];
    this.item.term = data["duration"];
    if (this.edit) {
      this.formatingDateTime(new Date(this.item.rent_start));
    } else {
      if (this.calenderDate) {
        this.formatingDateTime(new Date(this.calenderDate));
      } else {
        this.formatingDateTime(new Date());
      }
    }
  }

  private formatingDateTime(date) {
    const rentTime = this.cartS.getCurrentDateTime(date);
    this.rentalStart.date = rentTime["date"];
    this.rentalStart.time = rentTime["time"];
    setTimeout(() => this.dateTimePicker(date), 100);
  }

  reset() {
    this.edit = null;
    this.item = new CartItem();
    this.product = null;
    this.loader_sub = false;
    $(".admin-cart input").val("");
    this.cartS.getProductId(null);
    this.calenderDate = null;
  }

  private rentalDateChange() {
    $("#Renterl-date-cart")
      .datepicker()
      .on("changeDate", e => {
        let date = e.date;
        this.rentalStart["date"] = this.cartS.getCurrentDateTime(date)["date"];
      });
  }

  private rentalTimeChange() {
    $("#Rental-time-cart").on("change", () => {
      let time = $("#Rental-time-cart")
        .data("timepicker")
        .getTime();
      this.rentalStart["time"] = convertTime12to24(time);
    });
  }

  decreaseRent() {
    if (this.item.rental_duration > 1) {
      this.item.rental_duration--;
    }
  }

  increaseRent() {
    if (this.item.rental_duration < 5) {
      this.item.rental_duration++;
    }
  }

  error(err, message) {
    this.loader = false;
    this.loader_sub = false;
    this.loaderAdd = false;
    Helpers.setLoading(false);
    console.log(err);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

  getDate(d) {
    return this.cartS.formateListDate(d);
  }

  getType(d, t) {
    return d && t ? formateRentType(d, t) : "";
  }

  trackList(index, pro) {
    return pro ? pro.id : null;
  }

  addItem() {
    this.loaderAdd = true;
    this.item.location = GET_USER().location_id;
    if (!this.item.rental_type) {
      this.formatSendData();
    } else {
      this.formatSendData(
        this.rentalStart,
        this.product.deposit_amount,
        this.product.deposite_tax
      );
    }
    const sendItem = changeNullToEmpty(this.item);
    this.cartS
      .addCart(sendItem)
      .then(res => {
        this.loaderAdd = false;
        if (res.status == "OK") {
          if (res.result.error) {
            this.alertS.error(
              this.alertContainer,
              res.result.error,
              true,
              5000
            );
          } else {
            this.alertS.success(
              this.alertContainer,
              "Product has been added to cart",
              true,
              5000
            );
            this.productList = res.result.data;
            this.cartS.setSessionData("cartToken", res.result.data.token);
            this.updateCartList();
            this.reset();
          }
        }
      })
      .catch(err =>
        this.error(err, "Something wrong! Product has not been added to cart")
      );
  }

  private formatSendData(date?, dAmount?, dTax?) {
    this.item.rent_start = date ? this.cartS.formateDate(date) : null;
    this.item.deposit_amount = dAmount ? dAmount : 0;
    this.item.deposite_tax = dTax ? dTax : false;
  }

  changeCartNo() {
    this.cartS.cartNoChange(this.productList);
  }

  updateCartList(data?) {
    this.productList = data ? data : this.productList;
    this.cartS.setSessionData("cartList", this.productList);
    this.changeCartNo();
  }

  decreaseItemQuant() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
    }
  }

  increaseItemQuant() {
    this.item.quantity++;
  }

  removeCart(cart) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: "sm"
    });
    modalRef.componentInstance.massage = "Are you sure you want to delete?";
    modalRef.result.then(
      result => {
        if (result) {
          Helpers.setLoading(true);
          this.archiveItem(cart);
        }
      },
      res => {
        console.log(res);
      }
    );
  }

  archiveItem(cart) {
    this.cartS
      .deleteCart(cart, this.productList.token)
      .then(res => {
        Helpers.setLoading(false);
        if (res.status == "OK" && res.result.data) {
          this.deletLog(cart);
          this.alertS.success(
            this.alertContainer,
            "Product has been deleted from cart",
            true,
            5000
          );
          this.productList = res.result.data;
          if (
            this.productList.cart_items &&
            this.productList.cart_items.length < 1
          ) {
            this.ClearCart();
          }
          this.updateCartList();
          this.product = null;
        }
      })
      .catch(err =>
        this.error(
          err,
          "Something wrong! Product has not been deleted from cart"
        )
      );
  }

  deletLog(cart) {
    if (sessionStorage.getItem("item_log")) {
      let item_log = [];
      item_log = JSON.parse(sessionStorage.getItem("item_log"));
      if (item_log.length) {
        item_log = item_log.filter(item => {
          if (item.id !== cart.id) {
            return true;
          }
        });
        sessionStorage.setItem("item_log", JSON.stringify(item_log));
      }
    }
  }

  applyCoupon() {
    this.product = null;
    this.loader = true;
    const data = {
      token: this.productList.token,
      coupon: this.couponCode.code
    };
    this.cartS
      .applyCoupon(data)
      .toPromise()
      .then(
        res => {
          this.loader = false;
          if (res.result.error) {
            $("custom-alert").css("display", "block");
            this.alertS.error(
              this.alertContainer,
              "Invalid Coupon !!!",
              true,
              3000
            );
          } else {
            this.couponCode.set_coupon = true;
            this.cartS.setSessionData("coupon", this.couponCode);
            this.productList = res.result.data;
            $("custom-alert").css("display", "block");
            this.alertS.success(
              this.alertContainer,
              "Coupon Accesspectped ",
              true,
              3000
            );
            this.updateCartList();
          }
        },
        err => {
          this.loader = false;
          $("custom-alert").css("display", "block");
          this.alertS.error(
            this.alertContainer,
            "Something wrong !!! Please try again ",
            true,
            3000
          );
        }
      );
  }

  ClearCart() {
    this.session.forEach(name => {
      this.cartS.removeSessionData(name);
    });
  }

  checkOutProceed() {
    this.checkOut.emit();
    this.cartS.goToCheckOut(true);
    this.reset();
  }

  deliveryUpdate(e) {
    if(e.status) {
      this.updateCartList(e.data);
    }
  }

  editCart(cart, i) {
    this.reset();
    this.edit = true;
    this.item = cart;
    this.rent = true;
    this.index = i;
    this.getProduct(cart.variants_products_id, false);
  }

  updateCart() {
    this.loaderAdd = true;
    this.formatSendData(
      this.rentalStart,
      this.product.deposit_amount,
      this.product.deposite_tax
    );
    const sendItem = this.cartS.formatUpdateCart(this.item);
    sendItem.location = sendItem.location
      ? sendItem.location
      : GET_USER().location_id;
    this.cartS
      .addCart(this.item)
      .then(res => {
        this.loaderAdd = false;
        if (res.status == "OK") {
          if (res.result.error) {
            this.alertS.error(
              this.alertContainer,
              res.result.error,
              true,
              5000
            );
          } else {
            this.alertS.success(
              this.alertContainer,
              "Product has been updated",
              true,
              5000
            );
            this.productList = res.result.data;
            this.cartS.setSessionData("cartToken", res.result.data.token);
            this.updateCartList();
            this.reset();
          }
        }
      })
      .catch(err =>
        this.error(err, "Something wrong! Product has not been updated")
      );
  }

  decreaseQuant(cart, i) {
    if (cart.quantity > 1) {
      this.increament = i;
      const obj = {
        id: cart.id,
        token: this.productList.token,
        sales_tax: cart.sales_tax,
        increment: 0,
        price: cart.price,
        rental_duration: cart.rental_duration
      };
      this.updateCartQunt(obj);
    }
  }

  increaseQuant(cart, i) {
    this.increament = i;
    const obj = {
      id: cart.id,
      token: this.productList.token,
      increment: 1,
      sales_tax: cart.sales_tax,
      price: cart.price,
      rental_duration: cart.rental_duration
    };
    this.updateCartQunt(obj);
  }

  updateCartQunt(data) {
    this.product = null;
    this.cartS
      .updateCart(data)
      .then(res => {
        if (res.status === "OK") {
          this.productList = res.result.data;
          this.updateCartList();
          $("custom-alert").css("display", "block");
          this.alertS.success(
            this.alertContainer,
            "Cart Updated Successfully",
            true,
            3000
          );
        } else {
          $("custom-alert").css("display", "block");
          this.alertS.error(
            this.alertContainer,
            "Something wrong !! Please try again ",
            true,
            3000
          );
        }
        this.increament = null;
      })
      .catch(err => {
        console.log(err);
        $("custom-alert").css("display", "block");
        this.alertS.error(
          this.alertContainer,
          "Something wrong !! Please try again",
          true,
          3000
        );
        this.increament = null;
      });
  }

  addDiscount(price, basePrice, cart) {
    const modalRef = this.modalService.open(ProductDiscountComponent, {
      centered: true,
      windowClass: "discount"
    });
    modalRef.componentInstance.basePrice = basePrice;
    modalRef.componentInstance.price = price;
    modalRef.componentInstance.cart = cart;
    modalRef.componentInstance.token = this.productList.token;
    modalRef.result.then(
      result => {
        if (result) {
        }
      },
      res => {
        console.log(res);
      }
    );
  }
}
