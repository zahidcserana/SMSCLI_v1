import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductTagComponent } from './product-tag.component';
import { ProductListModule } from '../../../home-modules/product-list/product-list.module';
import { ProductFilteringModule } from '../../../home-modules/product-filtering/product-filtering.module';
import { PreloaderModule } from '../../../../modules/preloader/preloader.module';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
const routes: Routes = [
  {
    path: '',
    component: ProductTagComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductListModule,
    ProductFilteringModule,
    PreloaderModule,
    PaginationModule
  ],
  declarations: [ProductTagComponent]
})
export class ProductTagModule { }
