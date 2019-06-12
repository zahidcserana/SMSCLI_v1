import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSidebarComponent } from './order-sidebar.component';
import { OrderSidebarRoutingModule } from './order-sidebar-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OrderSidebarRoutingModule
  ],
  exports: [OrderSidebarRoutingModule],
  declarations: [OrderSidebarComponent]
})
export class OrderSidebarModule { }
