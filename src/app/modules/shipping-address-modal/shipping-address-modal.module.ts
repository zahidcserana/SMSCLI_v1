import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingAddressModalComponent } from './shipping-address-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [ShippingAddressModalComponent],
  declarations: [ShippingAddressModalComponent]
})
export class ShippingAddressModalModule { }
