import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCalenderComponent } from './product-calender.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReserveDialogBoxModule } from './reserve-dialog-box/reserve-dialog-box.module';
import { ReserveDialogBoxComponent } from './reserve-dialog-box/reserve-dialog-box.component';

const routes: Routes = [
  {
    path: '',
    component: ProductCalenderComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReserveDialogBoxModule
  ],
  entryComponents: [ReserveDialogBoxComponent],
  declarations: [ProductCalenderComponent],
})
export class ProductCalenderModule { }
