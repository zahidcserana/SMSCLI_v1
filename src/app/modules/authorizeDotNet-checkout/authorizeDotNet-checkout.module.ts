import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeDotNetCheckoutComponent } from './authorizeDotNet-checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../directive/directive.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NumberOnlyDirectiveModule
  ],
  declarations: [AuthorizeDotNetCheckoutComponent],
  exports: [AuthorizeDotNetCheckoutComponent],
})
export class AuthorizeDotNetCheckoutModule { }
