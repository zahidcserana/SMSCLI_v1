import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentGatewayComponent } from './payment-gateway.component';
import { AddFormComponent } from './add-form/add-form.component';
import { CardConectComponent } from './add-form/card-conect/card-conect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InstructionsComponent } from './add-form/instructions/instructions.component';


const route: Routes =[
  {path: '', component: PaymentGatewayComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ],
  entryComponents: [CardConectComponent, AddFormComponent],
  declarations: [PaymentGatewayComponent, AddFormComponent, CardConectComponent, InstructionsComponent]
})
export class PaymentGatewayModule { }
