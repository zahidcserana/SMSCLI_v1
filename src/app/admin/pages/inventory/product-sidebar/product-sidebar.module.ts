import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LayoutModule} from '../../../layouts/layout.module';
import { ProductSidebarComponent } from './product-sidebar.component';
import { ProductSidebarRoutingModule } from './product-sidebar-routing.module';



@NgModule({
  imports: [
    CommonModule,
    ProductSidebarRoutingModule
  ], exports: [
    ProductSidebarRoutingModule
  ], declarations: [
    ProductSidebarComponent
  ],
})
export class ProductSideBarModule {
}