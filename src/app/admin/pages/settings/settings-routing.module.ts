import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AdminService } from '../../admin.service';
import { PagesComponent } from '../pages.component';
import { SettingResolveService } from './setting-service/setting-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [{
            path: '',
            component: SettingsComponent,
            canActivate: [AdminService],
            children: [
                {
                    path: 'dashboard',
                    loadChildren: 'app/admin/pages/settings/settings-dashboard/settings-dashboard.module#SettingsDashboardModule'
                },
                {
                    path: 'manage-categories',
                    loadChildren: 'app/admin/pages/settings/categories/categories.module#CategoriesModule'
                },
                {
                    path: 'variant',
                    loadChildren: 'app/admin/pages/settings/attribute/attribute.module#AttributeModule',
                    resolve: { 'list': SettingResolveService }
                },
                {
                    path: 'tag',
                    loadChildren: 'app/admin/pages/settings/tags/tags.module#TagsModule',
                    resolve: { 'list': SettingResolveService }
                },
                {
                    path: 'coupon',
                    loadChildren: 'app/admin/pages/settings/coupon/coupon.module#CouponModule',
                    resolve: { 'list': SettingResolveService }
                },
                {
                    path: 'supplier',
                    loadChildren: 'app/admin/pages/settings/supplier/supplier.module#SupplierModule',
                    resolve: { 'list': SettingResolveService }
                },
                {
                    path: 'section',
                    loadChildren: 'app/admin/pages/settings/supplier/supplier.module#SupplierModule',
                    resolve: { 'list': SettingResolveService }
                },
                {
                    path: 'contents',
                    loadChildren: 'app/admin/pages/settings/all-contents/all-contents.module#AllContentsModule',
                },
                {
                    path: 'navigations',
                    loadChildren: 'app/admin/pages/settings/menu-settings/menu-settings.module#MenuSettingsModule',
                },
                {
                    path: 'location',
                    loadChildren: 'app/admin/pages/settings/bolt-terminal/bolt-terminal.module#BoltTerminalModule'
                },
                {
                    path: 'class',
                    loadChildren: 'app/admin/pages/settings/bolt-terminal/bolt-terminal.module#BoltTerminalModule'
                },
                {
                    path: 'widgets',
                    loadChildren: 'app/admin/pages/settings/widgets/widgets.module#WidgetsModule'
                },
                {
                    path: 'delivery',
                    loadChildren: 'app/admin/pages/settings/delivery/delivery.module#DeliveryModule',
                    resolve: {conditions: SettingResolveService}
                },
                {
                    path: 'order-receipt',
                    loadChildren: 'app/admin/pages/settings/order-receipt/order-receipt.module#OrderReceiptModule'
                },
                {
                    path: 'hours-holidays',
                    loadChildren: 'app/admin/pages/settings/hours-holiday/hours-holiday.module#HoursHolidayModule',
                    resolve: {weeks: SettingResolveService}
                },
                {
                    path: 'categories-variant',
                    loadChildren: 'app/admin/pages/settings/category-attribute/category-attribute.module#CategoryAttributeModule'
                },
                {
                    path: 'payment-gateways',
                    loadChildren: 'app/admin/pages/settings/payment-gateway/payment-gateway.module#PaymentGatewayModule'
                },
                {
                    path: 'accounts',
                    loadChildren: 'app/admin/pages/settings/accounts/accounts.module#AccountsModule'
                },
                {
                    path: 'shipping-settings',
                    loadChildren: 'app/admin/pages/settings/shipping-settings/shipping-settings.module#ShippingSettingsModule'
                },
                {
                    path: '**',
                    redirectTo: 'manage-categories',
                    pathMatch: 'full',
                },
            ]
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
