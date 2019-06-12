import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: '',
    component: SupplierComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    DialogBoxModule,
    PaginationModule
  ],
  entryComponents: [DialogBoxComponent],
  exports: [RouterModule],
  declarations: [SupplierComponent, AddSupplierComponent]
})
export class SupplierModule { }
