import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LayoutModule} from '../../../layouts/layout.module';
import {ProductListComponent} from './product-list.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), 
    LayoutModule, 
    FormsModule,
    PaginationModule
  ], exports: [
    RouterModule
  ], declarations: [
    ProductListComponent,
    ProductSearchComponent
  ]
})
export class ProductListModule {
}