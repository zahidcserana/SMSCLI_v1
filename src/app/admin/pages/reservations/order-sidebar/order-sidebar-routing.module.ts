import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { OrderSidebarComponent } from './order-sidebar.component';
import { OrderResolveService } from '../order.service/order-resolve.service';
import { RefundCheckService } from '../order.service/refund-check.service';


const routes: Routes = [
    {
        path: '',
        component: OrderSidebarComponent,
        children: [
            {
                path: 'product',
                loadChildren: 'app/admin/pages/reservations/order-sidebar/view-product/view-product.module#ViewProductModule',
                resolve: {'item': OrderResolveService}
            },
            {
                path: 'customer',
                loadChildren: 'app/admin/pages/reservations/order-sidebar/add-customer/add-customer.module#AddCustomerModule',
                resolve: {'customer': OrderResolveService}
            },
            {
                path: 'payment',
                loadChildren: 'app/admin/pages/reservations/order-sidebar/add-payment/add-payment.module#AddPaymentModule',
                resolve: {'payment': OrderResolveService}
            },
            {
                path: 'delivery',
                loadChildren: 'app/admin/pages/reservations/order-sidebar/delivery-details/delivery-details.module#DeliveryDetailsModule',
                resolve: {'delivery': OrderResolveService}
            },
            {
                path: 'refund',
                loadChildren: 'app/admin/pages/reservations/order-sidebar/add-delivery/add-delivery.module#AddDeliveryModule',
                resolve: {'refund': OrderResolveService}, canActivate: [RefundCheckService]
            },
            {
                path: '**',
                redirectTo: 'customer'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderSidebarRoutingModule {
}
