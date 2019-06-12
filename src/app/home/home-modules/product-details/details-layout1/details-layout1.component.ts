import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../type.model';
import { ProductDetailsLayout } from '../product-details';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartService } from '../../../home-service/cart.service';
import { AlertService } from '../../../../modules/alert/alert.service';


@Component({
  selector: 'app-details-layout1',
  templateUrl: './details-layout1.component.html',
  styleUrls: ['./details-layout1.component.css']
})
export class DetailsLayout1Component extends ProductDetailsLayout implements OnInit {

  cartLoad: boolean;

  @Input() product: Product;
  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor( 
    private http: HttpService, 
    private cartS: CartService,
    private alertS: AlertService
  ) {
    super();
   }

  ngOnInit() {
    this.details = this.product;
    if(this.details) {
      super.load();
    }
    this.cartS.cartReload.subscribe(
      val => {
        if(this.details) {
          super.checkAvailabe();
        }
      }
    );
  }

  addTocart() {
    const cart = super.addCartObj();
    if(this.diabledAddtoCart) { 
      this.cartLoad = true;
      this.cartS.addtoCart(cart).then(
        res => {
          if(res.status === 'OK') {
            if(res.result.error) {
              this.alertS.error(this.alertContainer, res.result.error, true, 5000);
            } else {
              this.alertS.success(this.alertContainer, 'Product has been added to cart', true, 5000);
            }
            this.cartS.saveCartsInlocalStorage(res.result.data);
            this.cartS.cartReload.next({ reload: true, items: res.result.data.cart_items });
            localStorage.setItem('token', res.result.data.token);
            this.cartLoad = false;
          }
        }
      ).catch(
        err => {
          this.cartLoad = false;
          this.alertS.error(this.alertContainer, 'Product has not been added to cart', true, 5000);
        }
      );
    } else {
      this.alertS.info(this.alertContainer, 'Required options are not selected', true, 3000);
    }
  }

  changeVariant (pos, id) {
    const data = super.changeVariantCall(pos, id);
    if( 'pos' in data) {
      this.variantChain(data);
    } else {
      this.getLastvariantChain(data);
    }
  }

  private variantChain (data) {
    this.http.get(`variant-chain?product_id=${this.product.id}&variant_id=${data.id}&variant_chain=${data.chain}`)
      .pipe( map( m => m.result.data), catchError ( e => of([])))
      .subscribe(
        res => {
          super.variantChainRes(res, data);
        }
      );
  }

  private getLastvariantChain (data) {
    this.http.get(`get-path-of-chain?product_id=${this.product.id}&variant_id=${data.id}&variant_chain=${data.chain}`)
      .pipe( map( m => m.result.data), catchError ( e => of({images: [], prices: [], variant: {quantity: {id: null, quantity: 0}}})))
      .subscribe(
        res => {
          super.getLastvariantChainCall(res);
        }
      );
  }


}
