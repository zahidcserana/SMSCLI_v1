import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductSidebarComponent} from './product-sidebar.component';
import { InventoryResolveService } from '../inventory-serveice/inventory-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: ProductSidebarComponent,
        children: [
            {
                path: 'description',
                loadChildren: 'app/admin/pages/inventory/product-sidebar/description/description.module#DescriptionModule',
                resolve: {'description': InventoryResolveService}
            },
            {
                path: 'pricing',
                loadChildren: 'app/admin/pages/inventory/product-sidebar/pricing/pricing.module#PricingModule',
                resolve: {'list': InventoryResolveService}
            },
            {
                path: 'categories',
                loadChildren: 'app/admin/pages/inventory/product-sidebar/categories/categories.module#CategoriesModule',
                resolve: {'list': InventoryResolveService}
            },
            {
                path: 'images',
                loadChildren: 'app/admin/pages/inventory/product-sidebar/images/images.module#ImagesModule',
                resolve: {'list': InventoryResolveService}
            },
            {
                path: 'variant',
                loadChildren: 'app/admin/pages/inventory/product-sidebar/product-attribute/product-attribute.module#ProductAttributeModule',
                resolve: {'list': InventoryResolveService}
            },
            {
                path: 'related-product',
                loadChildren: 'app/admin/pages/inventory/product-sidebar/related-product/related-product.module#RelatedProductModule',
                resolve: {'list': InventoryResolveService}
            },
            {
                path: 'availability',
                loadChildren: 'app/admin/pages/inventory/product-sidebar/availability/availability.module#AvailabilityModule',
                resolve: {'list': InventoryResolveService}
            },
            {
                path: 'calendar',
                loadChildren: 'app/admin/pages/inventory/product-sidebar/product-calender/product-calender.module#ProductCalenderModule',
                resolve: {'list': InventoryResolveService}
            },
            {
                path: '**',
                redirectTo: 'description'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductSidebarRoutingModule {
}
