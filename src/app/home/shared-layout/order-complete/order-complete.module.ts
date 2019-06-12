import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCompleteComponent } from './order-complete.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderInfoResoveService } from './order-resolve.service';
const routes: Routes = [
  {
    path: '',
    component: OrderCompleteComponent,
    resolve: {
      orderInfo: OrderInfoResoveService
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [OrderInfoResoveService],
  declarations: [OrderCompleteComponent]
})
export class OrderCompleteModule { }
