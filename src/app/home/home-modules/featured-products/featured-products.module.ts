import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProductsComponent } from './featured-products.component';
import { SingleProductItemModule } from '../single-product-item/single-product-item.module';
import { FeaturedLayout2Component } from './featured-layout2/featured-layout2.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SingleProductItemModule,
    RouterModule
  ],
  declarations: [FeaturedProductsComponent, FeaturedLayout2Component],
  exports: [FeaturedProductsComponent],
  entryComponents: [FeaturedLayout2Component]
})
export class FeaturedProductsModule { }
