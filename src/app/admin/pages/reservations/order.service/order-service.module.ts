import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import { OrderService } from './order.service';
import { OrderResolveService } from './order-resolve.service';
import { OrderServiceConfig } from '../models/order-models';
import { RefundCheckService } from './refund-check.service';


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [OrderService,OrderResolveService, RefundCheckService],
})
export class OrderServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: OrderServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: OrderServiceConfig): ModuleWithProviders {
        return {
            ngModule: OrderServiceModule,
            providers: [{provide: OrderServiceConfig, useValue: config}]
        };
    }
}