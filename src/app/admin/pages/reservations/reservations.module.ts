import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './reservations.component';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { LayoutModule } from '../../layouts/layout.module';
import { OrderServiceModule } from './order.service/order-service.module';


@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ReservationsRoutingModule,
    OrderServiceModule.forRoot()
  ],
  exports:[ReservationsRoutingModule],
  declarations: [ReservationsComponent]
})
export class ReservationsModule { }
