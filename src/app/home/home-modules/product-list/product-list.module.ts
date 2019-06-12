import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { SingleProductItemModule } from '../single-product-item/single-product-item.module';
@NgModule({
  imports: [
    CommonModule,
    SingleProductItemModule,
  ],
  declarations: [ProductListComponent],
  exports: [ProductListComponent]
})
export class ProductListModule { }
