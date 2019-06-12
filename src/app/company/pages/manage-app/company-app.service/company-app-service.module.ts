import { CompanyAppServiceConfig } from './../models/company-app.model';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CompanyAppService } from './company-app.service';
import { CompanyAppResolveService } from './company-app-resolve.service';





@NgModule({
    imports: [
        CommonModule
    ],
    providers: [CompanyAppService, CompanyAppResolveService],
})
export class CompanyAppServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: CompanyAppServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: CompanyAppServiceConfig): ModuleWithProviders {
        return {
            ngModule: CompanyAppServiceModule,
            providers: [{provide: CompanyAppServiceConfig, useValue: config}]
        };
    }
}