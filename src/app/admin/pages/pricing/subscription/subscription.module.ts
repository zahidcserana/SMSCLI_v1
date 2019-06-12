import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeSubscriptionComponent } from './upgrade-subscription/upgrade-subscription.component';
import { StripeCheckoutModule } from 'ng-stripe-checkout';
@NgModule({
  imports: [
    CommonModule,
    StripeCheckoutModule,
  ],
  declarations: [UpgradeSubscriptionComponent],
  exports: [UpgradeSubscriptionComponent]
})
export class SubscriptionModule { }
