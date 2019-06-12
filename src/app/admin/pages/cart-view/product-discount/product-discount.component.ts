import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { CartItem } from '../../../cart-service/cart.models';
import { AlertService } from '../../../../modules/alert/alert.service';
import { CartService } from '../../../cart-service/cart.service';

@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styleUrls: ['./product-discount.component.css']
})
export class ProductDiscountComponent implements OnInit, OnChanges {
  discount_value: number;
  subTotal = new FormControl('');
  note = new FormControl('');
  @ViewChild('hasAlert') alertContainer: ElementRef;
  @Input() price: number;
  @Input() cart;
  @Input() basePrice;
  @Input() token;

  calculated_price: number;
  loader: boolean;
  item_log = [];
  cart_item;
  
  constructor(
    private service: CartService,
    private alert: AlertService,
    private http: HttpService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal) {


  }

  ngOnInit() {
    this.calculated_price = this.basePrice;
    const price = 0;
    this.subTotal.setValue(price.toFixed(2));
    if (sessionStorage.getItem('item_log')) {
      this.item_log = JSON.parse(sessionStorage.getItem('item_log'));
    }
    if (this.item_log.length) {
      this.cart_item = this.item_log.find(item => {
        if (item.id === this.cart.id) {
          return true;
        }

      });
      if (this.cart_item) {
        this.note.setValue(this.cart_item.note);
      }
    }

  }
  ngOnChanges() {

  }

  submit() {
    this.loader = true;
    this.http.post('carts/add-discount', {token: this.token, cart_item_id: this.cart.id, sub_total: this.calculated_price, off_amount: this.discount_value })
      .toPromise()
      .then(res => {
        if (res.status === 'OK') {
          this.service.cartDiscount.next({ reload: true, cart: res.result.data.cart });
          // tslint:disable-next-line:max-line-length
          this.saveLogInStorage({ token: this.token, id: this.cart.id, product_id: this.cart.product.id, note: this.note.value, off_amount: this.discount_value, amount: this.calculated_price });
          this.alert.success(this.alertContainer, res.result.data.message, true, 5000);
          setTimeout(() => {
            this.activeModal.close(false);
          }, 2000);
        } else {
          this.alert.error(this.alertContainer, res.result.data.message, true, 5000);
        }
        this.loader = false;
      }).catch(err => {
        this.alert.error(this.alertContainer, 'Something wrong Please try again !!!', true, 5000);
        this.loader = false;
        console.log(err);
      });
  }
  selectDiscount(value) {
    this.discount_value = Number(value);
    const sub_total = (this.basePrice * (this.discount_value / 100));
    this.subTotal.setValue(sub_total.toFixed(2));
    this.calculated_price = this.basePrice - sub_total;
  }

  getDiscaountValue(value) {
    this.calculated_price = this.basePrice - Number(value);
  }

  saveLogInStorage(data) {
    this.cart_item = data;
    const index = this.item_log.findIndex(item => {
      if (item.id === this.cart.id) {
        return true;
      }
    });
    if (index > -1) {
      this.item_log[index] = this.cart_item;
    } else {
      this.item_log.push(data);
    }

    sessionStorage.setItem('item_log', JSON.stringify(this.item_log));
    console.log(this.item_log);
  }
}
