import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { InventoryService } from './inventory.service';
import { InventoryServiceConfig } from '../product-models/inventory.models';
import { InventoryResolveService } from './inventory-resolve.service';

@NgModule({
    providers: [InventoryService,InventoryResolveService],
})
export class InventoryServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: InventoryServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: InventoryServiceConfig): ModuleWithProviders {
        return {
            ngModule: InventoryServiceModule,
            providers: [{provide: InventoryServiceConfig, useValue: config}]
        };
    }
}
