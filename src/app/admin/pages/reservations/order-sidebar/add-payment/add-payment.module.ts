import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentComponent } from './add-payment.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../../../../../modules/directive/directive.module';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';


const routes: Routes = [
  {
      path: '',
      component: AddPaymentComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NumberOnlyDirectiveModule,
    DialogBoxModule
  ],
  entryComponents: [DialogBoxComponent],
  exports: [RouterModule],
  declarations: [AddPaymentComponent]
})
export class AddPaymentModule { }
