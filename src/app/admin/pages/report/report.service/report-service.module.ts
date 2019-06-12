import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReportService } from './report.service';
import { ReportServiceConfig } from '../models/report-models';
import { ReportResolveService } from './report-resolve.service';



@NgModule({
    imports: [
        CommonModule
    ],
    providers: [ReportService, ReportResolveService],
})
export class ReportServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: ReportServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: ReportServiceConfig): ModuleWithProviders {
        return {
            ngModule: ReportServiceModule,
            providers: [{provide: ReportServiceConfig, useValue: config}]
        };
    }
}