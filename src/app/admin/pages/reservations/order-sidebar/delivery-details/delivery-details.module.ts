import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryDetailsComponent } from './delivery-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: DeliveryDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DeliveryDetailsComponent]
})
export class DeliveryDetailsModule { }
