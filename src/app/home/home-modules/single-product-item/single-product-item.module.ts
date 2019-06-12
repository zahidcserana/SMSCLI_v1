import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductItemComponent } from './single-product-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SingleProductItemComponent],
  exports: [SingleProductItemComponent]
})
export class SingleProductItemModule { }
