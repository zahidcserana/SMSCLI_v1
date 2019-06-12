import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponComponent } from './coupon.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { FormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../../../../modules/directive/directive.module';

const route: Routes = [
  {
    path: '',
    component: CouponComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    DialogBoxModule,
    PaginationModule,
    NumberOnlyDirectiveModule
  ],
  entryComponents: [DialogBoxComponent],
  exports: [RouterModule],
  declarations: [CouponComponent, AddCouponComponent]
})
export class CouponModule { }
