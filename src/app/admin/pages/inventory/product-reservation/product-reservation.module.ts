import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductReservationComponent } from './product-reservation.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { CreateOrderComponent } from './create-order/create-order.component';

const route: Routes = [
  {
    path: '',
    component: ProductReservationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    PaginationModule
  ],
  declarations: [ProductReservationComponent, CreateOrderComponent]
})
export class ProductReservationModule { }
