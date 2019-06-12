import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreManagementComponent } from './store-management.component';
import { PagesComponent } from '../pages.component';
import { Routes, RouterModule } from '@angular/router';
import { CompanyService } from '../../company.service';
import { CompanyLayoutModule } from '../../layouts/company-layout.module';

const route: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{
        path: '',
        component: StoreManagementComponent,
        canActivate: [CompanyService],
        children:[
          {
            path: 'details',
            loadChildren: './store-details/store-details.module#StoreDetailsModule',
          },
          {
            path: 'inventory-summary',
            loadChildren: './inventory/inventory.module#InventoryModule',
          },
          {
            path: 'order-summary',
            loadChildren: './order/order.module#OrderModule',
          },
          {
            path: '**',
            redirectTo: 'details'
          }
        ]
    }]
  }
]

@NgModule({
  imports: [
    CommonModule,
    CompanyLayoutModule,
    RouterModule.forChild(route)
  ],
  declarations: [StoreManagementComponent]
})
export class StoreManagementModule { }
