import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartLayoutComponent } from './cart-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShippingMethodModule } from '../../home-modules/shipping-method/shipping-method.module';
const routes: Routes = [
  {
    path: '',
    component: CartLayoutComponent,
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ShippingMethodModule
  ],
  providers: [],
  declarations: [CartLayoutComponent]
})
export class CartLayoutModule { }
