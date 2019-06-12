import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CartService } from './cart.service';
import { CartServiceConfig } from './cart.models';



@NgModule({
    providers: [CartService],
})
export class CartServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: CartServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: CartServiceConfig): ModuleWithProviders {
        return {
            ngModule: CartServiceModule,
            providers: [{provide: CartServiceConfig, useValue: config}]
        };
    }
}

