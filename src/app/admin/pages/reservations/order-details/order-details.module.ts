import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { CustomerComponent } from './customer/customer.component';
import { ItemsComponent } from './items/items.component';
import { PaymentComponent } from './payment/payment.component';
import { TransactionComponent } from './transaction/transaction.component';
import { StatusDialogBoxModule } from '../dialog-box/dialog-box.module';
import { StatusDialogBoxComponent } from '../dialog-box/dialog-box.component';

const routes: Routes = [
  {
      path: '',
      component: OrderDetailsComponent,
      children: [
        {
            path: 'edit',
            loadChildren: 'app/admin/pages/reservations/order-sidebar/order-sidebar.module#OrderSidebarModule'
        }
      ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StatusDialogBoxModule
  ],
  entryComponents: [StatusDialogBoxComponent],
  exports: [RouterModule],
  declarations: [OrderDetailsComponent, OrderComponent, CustomerComponent, ItemsComponent, PaymentComponent, TransactionComponent]
})
export class OrderDetailsModule { }
