import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeliveryComponent } from './add-delivery.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../../../../../modules/directive/directive.module';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { WarningDialogBoxModule } from './dialog-box/dialog-box.module';
import { WarningDialogBoxComponent } from './dialog-box/dialog-box.component';


const routes: Routes = [
  {
      path: '',
      component: AddDeliveryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NumberOnlyDirectiveModule,
    DialogBoxModule,
    WarningDialogBoxModule
  ],
  entryComponents: [DialogBoxComponent, WarningDialogBoxComponent],
  exports: [RouterModule],
  declarations: [AddDeliveryComponent]
})
export class AddDeliveryModule { }
