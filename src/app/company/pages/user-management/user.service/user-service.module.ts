import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PartnerUserServiceConfig } from '../models/user.models';
import { PartnerUserService } from './user.service';
import { PartnerUserResolveService } from './user-resolve.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [PartnerUserService, PartnerUserResolveService],
})
export class PartnerUserServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: PartnerUserServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: PartnerUserServiceConfig): ModuleWithProviders {
        return {
            ngModule: PartnerUserServiceModule,
            providers: [{provide: PartnerUserServiceConfig, useValue: config}]
        };
    }
}