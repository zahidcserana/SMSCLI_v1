import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { OrderFilterComponent } from './order-filter/order-filter.component';
import { NumberOnlyDirectiveModule } from '../../../../modules/directive/directive.module';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { StatusDialogBoxComponent } from '../dialog-box/dialog-box.component';
import { StatusDialogBoxModule } from '../dialog-box/dialog-box.module';

const route: Routes = [
    {
      path: '',
      component: OrderListComponent,
      children: [
        {
          path: 'edit-order/:order_id',
          loadChildren: 'app/admin/pages/reservations/order-sidebar/order-sidebar.module#OrderSidebarModule'
        }
      ]
    }
];

@NgModule({
  imports: [
    CommonModule,
    DialogBoxModule,
    FormsModule,
    PaginationModule,
    RouterModule.forChild(route),
    NumberOnlyDirectiveModule,
    StatusDialogBoxModule
  ],
  entryComponents: [DialogBoxComponent, StatusDialogBoxComponent],
  exports: [RouterModule],
  declarations: [OrderListComponent, OrderFilterComponent]
})
export class OrderListModule { }
