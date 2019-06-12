import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import { StoreServiceConfig } from '../models/store.model';
import { StoreService } from './store.service';
import { StoreResolveService } from './store-resolve.service';




@NgModule({
    imports: [
        CommonModule
    ],
    providers: [StoreService, StoreResolveService],
})
export class StoreServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: StoreServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: StoreServiceConfig): ModuleWithProviders {
        return {
            ngModule: StoreServiceModule,
            providers: [{provide: StoreServiceConfig, useValue: config}]
        };
    }
}