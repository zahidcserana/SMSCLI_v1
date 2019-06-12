import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerComponent } from './add-customer.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Select2AJAXModule } from '../../../../../modules/select2-ajax/select2-ajax.module';
import { NumberOnlyDirectiveModule } from '../../../../../modules/directive/directive.module';

const routes: Routes = [
  {
      path: '',
      component: AddCustomerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Select2AJAXModule,
    RouterModule.forChild(routes),
    NumberOnlyDirectiveModule
  ],
  exports: [RouterModule],
  declarations: [AddCustomerComponent]
})
export class AddCustomerModule { }
