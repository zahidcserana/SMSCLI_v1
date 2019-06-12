import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PartnerUserProfileService } from './user-profile.service';
import { PartnerUserProfileResolveService } from './user-profile-resolve.service';
import { PartnerUserProfileServiceConfig } from '../models/user-profile.models';


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [PartnerUserProfileService, PartnerUserProfileResolveService],
})
export class PartnerUserProfileServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: PartnerUserProfileServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: PartnerUserProfileServiceConfig): ModuleWithProviders {
        return {
            ngModule: PartnerUserProfileServiceModule,
            providers: [{provide: PartnerUserProfileServiceConfig, useValue: config}]
        };
    }
}