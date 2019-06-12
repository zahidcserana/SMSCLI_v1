import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import { DashboardServiceConfig } from '../models/dashboar-models';
import { DashboardResolveService } from './dashbord-resolve.service';
import { DashboarService } from './dashboard.service';



@NgModule({
    imports: [
        CommonModule
    ],
    providers: [DashboarService, DashboardResolveService],
})
export class DashboarServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: DashboarServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: DashboardServiceConfig): ModuleWithProviders {
        return {
            ngModule: DashboarServiceModule,
            providers: [{provide: DashboardServiceConfig, useValue: config}]
        };
    }
}