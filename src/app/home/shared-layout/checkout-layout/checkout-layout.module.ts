import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummeryComponent } from './order-summery/order-summery.component';
import { NumberOnlyDirectiveModule } from '../../../modules/directive/directive.module';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { StripeCheckoutModule } from '../../../modules/stripe-checkout/stripe-checkout.module';
import { CardConnectCheckoutModule } from '../../../modules/card-connect-checkout/card-connect-checkout.module';
import { PaypalCheckoutModule } from '../../../modules/paypal-checkout/paypal-checkout.module';
import { CheckoutLayoutComponent } from './checkout-layout.component';
import { ShippingMethodModule } from '../../home-modules/shipping-method/shipping-method.module';
import { AuthorizeDotNetCheckoutModule } from '../../../modules/authorizeDotNet-checkout/authorizeDotNet-checkout.module';
import { CardConnectCheckoutComponent } from '../../../modules/card-connect-checkout/card-connect-checkout.component';
import { StripeCheckoutComponent } from '../../../modules/stripe-checkout/stripe-checkout.component';
import { PaypalCheckoutComponent } from '../../../modules/paypal-checkout/paypal-checkout.component';
import { AuthorizeDotNetCheckoutComponent } from '../../../modules/authorizeDotNet-checkout/authorizeDotNet-checkout.component';

const route: Routes = [
  {
    path: '',
    component: CheckoutLayoutComponent,

  }
];

@NgModule({
  imports: [
    ShippingMethodModule,
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    FormsModule,
    NgbTabsetModule,
    StripeCheckoutModule,
    CardConnectCheckoutModule,
    NumberOnlyDirectiveModule,
    PaypalCheckoutModule,
    AuthorizeDotNetCheckoutModule
  ],
  exports: [RouterModule],
  entryComponents: [CardConnectCheckoutComponent, StripeCheckoutComponent, PaypalCheckoutComponent, AuthorizeDotNetCheckoutComponent],
  declarations: [CheckoutLayoutComponent, DeliveryDetailsComponent, PaymentInfoComponent, PlaceOrderComponent, OrderSummeryComponent, PaymentGatewayComponent]
})

export class CheckoutLayoutModule { }
