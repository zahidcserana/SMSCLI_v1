import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import { UserServiceConfig } from '../models/user.models';
import { UserService } from './user.service';
import { UserResolveService } from './user-resolve.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [UserService,UserResolveService],
})
export class UserServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: UserServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: UserServiceConfig): ModuleWithProviders {
        return {
            ngModule: UserServiceModule,
            providers: [{provide: UserServiceConfig, useValue: config}]
        };
    }
}