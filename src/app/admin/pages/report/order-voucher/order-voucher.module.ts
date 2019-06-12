import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderVoucherComponent } from './order-voucher.component';
import { Routes, RouterModule } from '@angular/router';
import { VoucherFilterComponent } from './voucher-filter/voucher-filter.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { OrderDialogBoxComponent } from './dialog-box/dialog-box.component';
import { OrderDialogBoxModule } from './dialog-box/dialog-box.module';


const route: Routes = [
  {
    path: '',
    component: OrderVoucherComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    PaginationModule,
    OrderDialogBoxModule
  ],
  entryComponents: [OrderDialogBoxComponent],
  exports: [RouterModule],
  declarations: [OrderVoucherComponent, VoucherFilterComponent]
})
export class OrderVoucherModule { }
