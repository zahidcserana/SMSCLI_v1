import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { SidebarServiceConfig } from './sidebar.models';
import { SidebarService } from './sidebar.service';


@NgModule({
    providers: [SidebarService],
})
export class SidebarServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: SidebarServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: SidebarServiceConfig): ModuleWithProviders {
        return {
            ngModule: SidebarServiceModule,
            providers: [{provide: SidebarServiceConfig, useValue: config}]
        };
    }
}

