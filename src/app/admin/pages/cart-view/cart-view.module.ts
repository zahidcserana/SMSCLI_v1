import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './cart-view.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { PaymentComponent } from './payment/payment.component';
import { DialogBoxComponent } from '../../../modules/dialog-box/dialog-box.component';
import { DialogBoxModule } from '../../../modules/dialog-box/dialog-box.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../../../modules/directive/directive.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDiscountComponent } from './product-discount/product-discount.component';
import { StripeCheckoutModule } from '../../../modules/stripe-checkout/stripe-checkout.module';
import { CardConnectCheckoutModule } from '../../../modules/card-connect-checkout/card-connect-checkout.module';
import { StripeCheckoutComponent } from '../../../modules/stripe-checkout/stripe-checkout.component';
import { PaypalCheckoutComponent } from '../../../modules/paypal-checkout/paypal-checkout.component';
import { CardConnectCheckoutComponent } from '../../../modules/card-connect-checkout/card-connect-checkout.component';
import { PaypalCheckoutModule } from '../../../modules/paypal-checkout/paypal-checkout.module';
import { AuthorizeDotNetCheckoutModule } from '../../../modules/authorizeDotNet-checkout/authorizeDotNet-checkout.module';
import { AuthorizeDotNetCheckoutComponent } from '../../../modules/authorizeDotNet-checkout/authorizeDotNet-checkout.component';
import { ShippingAddressModalModule } from '../../../modules/shipping-address-modal/shipping-address-modal.module';
import { ShippingAddressModalComponent } from '../../../modules/shipping-address-modal/shipping-address-modal.component';
import { DeliverySectionComponent } from './delivery-section/delivery-section.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DialogBoxModule,
    NumberOnlyDirectiveModule,
    NgbModule,
    ReactiveFormsModule,
    CardConnectCheckoutModule,
    StripeCheckoutModule,
    PaypalCheckoutModule,
    AuthorizeDotNetCheckoutModule,
    ShippingAddressModalModule
  ],
  exports: [CartViewComponent,],
  entryComponents: [DialogBoxComponent, ProductDiscountComponent, StripeCheckoutComponent, PaypalCheckoutComponent, CardConnectCheckoutComponent, AuthorizeDotNetCheckoutComponent, ShippingAddressModalComponent],
  declarations: [CartViewComponent, CartComponent, CheckOutComponent, PaymentComponent, ProductDiscountComponent, DeliverySectionComponent]
})
export class CartViewModule { }
