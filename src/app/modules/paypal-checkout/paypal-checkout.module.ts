import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalCheckoutComponent } from './paypal-checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../directive/directive.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NumberOnlyDirectiveModule
  ],
  declarations: [PaypalCheckoutComponent],
  exports: [PaypalCheckoutComponent],
})
export class PaypalCheckoutModule { }
