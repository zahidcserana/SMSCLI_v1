import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RegisterServiceConfig } from '../models/register-models';
import { RegisterService } from './register.service';
import { RegisterResolveService } from './register-resolve.service';
import { RegisterCheckService } from './register-check.service';




@NgModule({
    imports: [
        CommonModule
    ],
    providers: [RegisterService, RegisterResolveService, RegisterCheckService],
})
export class RegisterServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: RegisterServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: RegisterServiceConfig): ModuleWithProviders {
        return {
            ngModule: RegisterServiceModule,
            providers: [{provide: RegisterServiceConfig, useValue: config}]
        };
    }
}