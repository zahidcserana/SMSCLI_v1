import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingMethodComponent } from './shipping-method.component';
import { ShippingAddressModalComponent } from '../../../modules/shipping-address-modal/shipping-address-modal.component';
import { ShippingAddressModalModule } from '../../../modules/shipping-address-modal/shipping-address-modal.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ShippingAddressModalModule,
    FormsModule
  ],
  entryComponents: [ShippingAddressModalComponent],
  declarations: [ShippingMethodComponent],
  exports: [ShippingMethodComponent],
})
export class ShippingMethodModule { }
