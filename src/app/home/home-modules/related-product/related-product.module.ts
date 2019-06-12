import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedProductComponent } from './related-product.component';
import { SingleProductItemModule } from '../single-product-item/single-product-item.module';

@NgModule({
  imports: [
    CommonModule,
    SingleProductItemModule
  ],
  declarations: [RelatedProductComponent],
  exports: [RelatedProductComponent],
})
export class RelatedProductModule { }
