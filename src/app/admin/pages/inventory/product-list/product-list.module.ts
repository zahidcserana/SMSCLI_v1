import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LayoutModule} from '../../../layouts/layout.module';
import {ProductListComponent} from './product-list.component';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { ProductServiceModule } from './product-service/product.service.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    children: [
      {
          path: 'edit/:product_id',
          loadChildren: 'app/admin/pages/inventory/product-sidebar/product-sidebar.module#ProductSideBarModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), 
    LayoutModule, 
    DialogBoxModule,
    ProductServiceModule.forRoot(),
    FormsModule,
    PaginationModule
  ], exports: [
    RouterModule
  ], declarations: [
    ProductListComponent,
    ProductSearchComponent
  ],
  entryComponents:[DialogBoxComponent]
})
export class ProductListModule {
}