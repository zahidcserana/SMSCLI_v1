import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { AdminService } from '../../admin.service';
import { InventoryComponent } from './inventory.component';
import { PagesComponent } from '../pages.component';
import { InventoryResolveService } from './inventory-serveice/inventory-resolve.service';
import { ProductListService } from './product-list/product-service/product-list.service';


const routes: Routes = [
    {   
        path: '',
        component: PagesComponent,
        children:[
            {path: '',
            component: InventoryComponent,
            canActivate: [AdminService],
            children: [
                {
                    path: '',
                    loadChildren: 'app/admin/pages/inventory/product-list/product-list.module#ProductListModule',
                    //resolve: {'supplier': InventoryResolveService}
                },
                {
                    path: 'dashboard',
                    loadChildren: './inventory-dashboard/inventory-dashboard.module#InventoryDashboardModule',
                },
                {
                    path: 'add',
                    loadChildren: 'app/admin/pages/inventory/add-product/add-product.module#AddProductModule',
                },
                {
                    path: 'product-reservation',
                    loadChildren: 'app/admin/pages/inventory/product-reservation/product-reservation.module#ProductReservationModule'
                },
                {
                    path: 'import-inventory',
                    loadChildren: 'app/admin/pages/inventory/import-file/import-file.module#ImportFileModule'
                },
                {
                    path: 'product-quantity-list',
                    loadChildren: 'app/admin/pages/inventory/product-qty-list/product-list.module#ProductListModule',
                    resolve: {'supplier': InventoryResolveService}
                }
            ]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InventoryRoutingModule {
}

