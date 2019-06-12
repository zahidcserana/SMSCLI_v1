import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { SettingResolveService } from './setting-resolve.service';
import { SettingService } from './setting.service';
import { SettingsServiceConfig } from '../models/settings.models';
import { ContentService } from './contents.service';
import { HoursHolidaysService } from './hours-holidays.service';
import { OrderReceiptService } from './orderReceipt.service';


@NgModule({
    providers: [SettingService,SettingResolveService, ContentService, HoursHolidaysService, OrderReceiptService],
})
export class SettingsServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: SettingsServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: SettingsServiceConfig): ModuleWithProviders {
        return {
            ngModule: SettingsServiceModule,
            providers: [{provide: SettingsServiceConfig, useValue: config}]
        };
    }
}
