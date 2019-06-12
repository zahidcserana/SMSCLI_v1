import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminService } from '../../admin.service';
import { PagesComponent } from '../pages.component';
import { ReservationsComponent } from './reservations.component';
import { OrderService } from './order.service/order.service';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{
        path: '',
        component: ReservationsComponent,
        canActivate: [AdminService],
        children: [
            {
                path: 'dashboard',
                loadChildren: 'app/admin/pages/reservations/reservations-dashboard/reservations-dashboard.module#ReservationsDashboardModule'
            },
            {
                path: ':order_id/details',
                loadChildren: 'app/admin/pages/reservations/order-details/order-details.module#OrderDetailsModule'
            },
            {
                path: 'rental-orders',
                loadChildren: 'app/admin/pages/reservations/order-list/order-list.module#OrderListModule',
                resolve: {'order': OrderService}
            },
            {
                path: 'rental-calendar',
                loadChildren: 'app/admin/pages/reservations/rental-calender/rental-calender.module#RentalCalenderModule'
            },
            {
                path: ':status',
                loadChildren: 'app/admin/pages/reservations/order-list/order-list.module#OrderListModule',
                resolve: {'order': OrderService}
            }
        ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule {}