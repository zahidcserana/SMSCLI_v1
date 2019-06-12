import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardConnectCheckoutComponent } from './card-connect-checkout.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CardConnectCheckoutComponent],
  exports: [CardConnectCheckoutComponent]
})
export class CardConnectCheckoutModule { }
