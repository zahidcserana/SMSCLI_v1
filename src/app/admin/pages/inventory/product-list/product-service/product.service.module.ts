import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { ProductListService } from './product-list.service';
import { ProductServiceConfig } from '../../product-models/inventory.models';



@NgModule({
    providers: [ProductListService],
})
export class ProductServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: ProductServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: ProductServiceConfig): ModuleWithProviders {
        return {
            ngModule: ProductServiceModule,
            providers: [{provide: ProductServiceConfig, useValue: config}]
        };
    }
}
