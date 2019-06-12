import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Layout1Component } from './layout1.component';
import { BreadcrumbResolveService } from '../home-service/breadcrumb-resolve.service';
import { ProductResolveService } from '../home-service/product-service-resolve';
import { CartResolveService } from '../home-service/cart-resolve.service';
import { ShippingResolveService } from '../home-service/shipping-resolve.service';
import { PaymentGatewayResolveService } from '../home-service/gateway-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: Layout1Component,
        children: [
            {
                path: '',
                loadChildren: './pages/home/home.module#HomeModule'
            },
            {
                path: 'product/:id/:name',
                loadChildren: './pages/product-view/product-view.module#ProductViewModule',
                resolve: {
                    product_details: ProductResolveService
                },
            },
            {
                path: 'tag/:url',
                loadChildren: './pages/product-tag/product-tag.module#ProductTagModule',
                data: { type: 'tag' },
                resolve: {
                    breadCrumb: BreadcrumbResolveService,
                    categories: ProductResolveService,
                }
            },
            {
                path: 'products-list',
                loadChildren: './pages/product-tag/product-tag.module#ProductTagModule',
                data: { type: 'all' },
                resolve: {
                    breadCrumb: BreadcrumbResolveService,
                    categories: ProductResolveService,
                }
            },
            {
                path: 'category/:uuid/:url',
                loadChildren: './pages/product-tag/product-tag.module#ProductTagModule',
                data: { type: 'category' },
                resolve: {
                    breadCrumb: BreadcrumbResolveService,
                    categories: ProductResolveService,
                }
            },
            {
                path: 'product/search',
                loadChildren: './pages/product-tag/product-tag.module#ProductTagModule',
                data: { type: 'search' },
                resolve: {
                    breadCrumb: BreadcrumbResolveService,
                    categories: ProductResolveService,
                }
            },
            {
                path: 'cart/:token',
                loadChildren: '../shared-layout/cart-layout/cart-layout.module#CartLayoutModule',
                resolve: {
                    carts: CartResolveService,
                    shipping: ShippingResolveService
                }
            },
            {
                path: 'checkout',
                loadChildren: '../shared-layout/checkout-layout/checkout-layout.module#CheckoutLayoutModule',
                resolve: {
                    shipping: ShippingResolveService,
                    payment_gateways: PaymentGatewayResolveService
                }
            },
            {
                path: 'terms-and-conditions',
                loadChildren: '../shared-layout/terms-condition-layout/terms-condition.module#TermsConditionModule'
            },
            {
                path: 'about',
                loadChildren: '../shared-layout/about-layout/about.module#AboutModule'
            },
            {
                path: 'contact',
                loadChildren: '../shared-layout/contact-layout/contact.module#ContactModule'
            },
            {
                path: 'page/:slug',
                loadChildren: '../shared-layout/custom-page/custom-page.module#CustomPageModule'
            },
            {
                path: 'order/:id',
                loadChildren: '../shared-layout/order-complete/order-complete.module#OrderCompleteModule'
            }
        ]

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Layout1RoutingModule {
}
