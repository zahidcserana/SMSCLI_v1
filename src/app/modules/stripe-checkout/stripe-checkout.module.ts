import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeCheckoutComponent } from './stripe-checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../directive/directive.module';
@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NumberOnlyDirectiveModule,
  ],
  declarations: [StripeCheckoutComponent],
  exports: [StripeCheckoutComponent],
})
export class StripeCheckoutModule { }
