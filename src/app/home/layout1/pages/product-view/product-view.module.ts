import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductViewComponent } from './product-view.component';
import { ProductDetailsModule } from '../../../home-modules/product-details/product-details.module';
import { RelatedProductModule } from '../../../home-modules/related-product/related-product.module';
import { SafeHtmlModule } from '../../../../modules/safe-html/safe-html.pipe';
const routes: Routes = [
  { path: '', component: ProductViewComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ProductDetailsModule,
    RelatedProductModule,
    SafeHtmlModule
  ],
  declarations: [ProductViewComponent]
})
export class ProductViewModule { }
